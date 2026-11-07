
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import escapeHtml from "escape-html";

let rateLimiter;

function getRateLimiter() {
  if (!rateLimiter) {
    const redis = Redis.fromEnv();

    rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "portfolio-contact",
      analytics: false,
    });
  }

  return rateLimiter;
}

function redirectWithStatus(request, status, headers = {}) {
  return NextResponse.redirect(
    new URL(`/?contact=${status}#contact`, request.url),
    {
      status: 303,
      headers,
    }
  );
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim();

  if (!ip || ip.length > 100) {
    return null;
  }

  return ip;
}

export async function POST(request) {
  try {
    // read form data
    const formData = await request.formData();

    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");

    const website = formData.get("website");
    const turnstileToken = formData.get(
      "cf-turnstile-response"
    );

    // honeypot
    if (
      typeof website === "string" &&
      website.trim()
    ) {
      return redirectWithStatus(request, "success");
    }

    // rate limiting
    const ip = getClientIp(request);

    if (!ip) {
      console.error("Could not determine visitor IP address");
      return redirectWithStatus(request, "error");
    }

    const limiter = getRateLimiter();

    const { success, reset } = await limiter.limit(ip);

    if (!success) {
      const retryAfter = Math.max(
        1,
        Math.ceil((reset - Date.now()) / 1000)
      );

      console.warn("Contact form rate limit reached");

      return redirectWithStatus(
        request,
        "rate-limited",
        {
          "Retry-After": String(retryAfter),
        }
      );
    }

    // validate input
    if (
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return redirectWithStatus(request, "error");
    }

    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // server-side validation
    if (
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 120 ||
      cleanMessage.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      /[\r\n]/.test(cleanSubject)
    ) {
      return redirectWithStatus(request, "error");
    }

    // check turnstile token
    if (
      typeof turnstileToken !== "string" ||
      !turnstileToken ||
      turnstileToken.length > 2048
    ) {
      return redirectWithStatus(request, "captcha");
    }

    // verify turnstile
    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!verificationResponse.ok) {
      console.error("Turnstile verification request failed");
      return redirectWithStatus(request, "error");
    }

    const verification = await verificationResponse.json();

    // different prod/dev rules
    const isDevelopment = process.env.NODE_ENV !== "production";

    let validVerification = false;

    if (isDevelopment) {
      validVerification = verification.success === true;
    } else {
      const allowedHostnames = (
        process.env.TURNSTILE_ALLOWED_HOSTNAMES || ""
      )
        .split(",")
        .map((host) => host.trim().toLowerCase())
        .filter(Boolean);

      validVerification =
        verification.success === true &&
        verification.action === "contact" &&
        allowedHostnames.includes(
          (verification.hostname || "").toLowerCase()
        );
    }

    if (!validVerification) {
      console.error("Turnstile verification rejected");
      return redirectWithStatus(request, "captcha");
    }

    // prepare email content
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage).replace(
      /\n/g,
      "<br>"
    );

    const date = new Date().toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/London",
    });

    const html = `
      <!DOCTYPE html>
      <html>
        <body style="
          margin: 0;
          padding: 30px 15px;
          background-color: #f3f4f6;
          font-family: Arial, Helvetica, sans-serif;
          color: #1f2937;
        ">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="max-width: 600px; margin: 0 auto;"
          >
            <tr>
              <td style="
                background: linear-gradient(135deg, #172554, #312e81);
                padding: 30px;
                border-radius: 12px 12px 0 0;
                color: #ffffff;
              ">
                <p style="
                  margin: 0 0 10px;
                  font-size: 12px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  color: #c7d2fe;
                ">
                  Portfolio notification
                </p>

                <h1 style="
                  margin: 0;
                  font-size: 25px;
                  font-weight: 700;
                ">
                  New enquiry received
                </h1>

                <p style="
                  margin: 10px 0 0;
                  font-size: 14px;
                  color: #e0e7ff;
                ">
                  Someone has contacted you through your portfolio.
                </p>
              </td>
            </tr>

            <tr>
              <td style="
                background: #ffffff;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
              ">

                <h2 style="
                  margin: 0 0 20px;
                  font-size: 16px;
                  color: #111827;
                ">
                  Sender details
                </h2>

                <table
                  role="presentation"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                  style="
                    background: #f9fafb;
                    border-radius: 8px;
                    padding: 18px;
                  "
                >
                  <tr>
                    <td style="
                      padding-bottom: 14px;
                      font-size: 12px;
                      color: #6b7280;
                      width: 90px;
                    ">
                      EMAIL
                    </td>

                    <td style="
                      padding-bottom: 14px;
                      font-size: 14px;
                      font-weight: 600;
                      color: #1f2937;
                      word-break: break-word;
                    ">
                      <a
                        href="mailto:${safeEmail}"
                        style="color: #4f46e5; text-decoration: none;"
                      >
                        ${safeEmail}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td style="
                      font-size: 12px;
                      color: #6b7280;
                    ">
                      SUBJECT
                    </td>

                    <td style="
                      font-size: 14px;
                      font-weight: 600;
                      color: #1f2937;
                      word-break: break-word;
                    ">
                      ${safeSubject}
                    </td>
                  </tr>
                </table>

                <h2 style="
                  margin: 30px 0 14px;
                  font-size: 16px;
                  color: #111827;
                ">
                  Message
                </h2>

                <div style="
                  padding: 20px;
                  background: #f9fafb;
                  border-left: 4px solid #4f46e5;
                  border-radius: 4px;
                  font-size: 14px;
                  line-height: 1.8;
                  color: #374151;
                  overflow-wrap: anywhere;
                ">
                  ${safeMessage}
                </div>

                <div style="margin-top: 25px; text-align: center;">
                  <a
                    href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${cleanSubject}`)}"
                    style="
                      display: inline-block;
                      padding: 13px 24px;
                      background: #4f46e5;
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 7px;
                      font-size: 14px;
                      font-weight: 600;
                    "
                  >
                    Reply to enquiry →
                  </a>
                </div>

              </td>
            </tr>

            <tr>
              <td style="
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #9ca3af;
              ">
                Received on ${date}<br>
                Sent automatically by your portfolio contact form.
              </td>
            </tr>
          </table>

        </body>
      </html>
    `;

    const text = `
NEW PORTFOLIO ENQUIRY
=====================

SENDER
Email: ${cleanEmail}

SUBJECT
${cleanSubject}

MESSAGE
${cleanMessage}

---------------------

Received: ${date}

Reply directly to this email to contact the sender.
    `;

    // send email using Resend
    const emailResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO],
          reply_to: cleanEmail,
          subject: `New Portfolio Enquiry: ${cleanSubject}`,
          html,
          text,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!emailResponse.ok) {
      const resendError = await emailResponse.text();
      console.error("Resend delivery failed:", resendError);

      return redirectWithStatus(request, "error");
    }

    // successful submission
    return redirectWithStatus(request, "success");

  } catch (error) {
    console.error("Contact form error:", error);
    return redirectWithStatus(request, "error");
  }
}

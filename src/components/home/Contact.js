import FadeInSection from "../client/hooks/FadeIn";
import { FaEnvelope } from "react-icons/fa";
import Button from "../Button";
import SocialsHoriz from "../SocialsHoriz";
import Script from "next/script";

export default function Contact({ status }) {
  return (
    <section
      className="relative bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 min-h-[85vh] overflow-hidden flex items-center justify-center"
      id="contact"
    >
      <div className="mt-35 mb-35 sm:mt-0 sm:mb-10">
        
      <div
        className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full"
        style={{ backgroundColor: "#800000" }}
      />
      <div
        className="absolute top-0 left-0 w-32 h-32 rounded-br-full"
        style={{ backgroundColor: "#16A34A" }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full"
        style={{ backgroundColor: "#EA580C" }}
      />
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-bl-full"
        style={{ backgroundColor: "#EAB308" }}
      />

      <FadeInSection className="w-full px-6 sm:px-24 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-sans text-4xl text-white mb-6 flex items-center gap-3">
            <FaEnvelope />
            Contact Me
          </h1>
          <p className="text-white font-mono text-lg mb-4">
            Want to collaborate, ask a question, or just say hi? Email me at 
            <a href="mailto:hamd.waseem@hamdtel.co.uk" className="text-cyan-400 hover:text-cyan-300 hover:underline"> hamd.waseem@hamdtel.co.uk</a> 
            <span> or drop a message below and I’ll get back to you.</span>
          </p>

          <SocialsHoriz className="justify-center sm:justify-start items-center text-3xl sm:text-2xl mb-6" />

          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />

          <form
            action="/api/contact"
            method="POST"
            className="grid grid-cols-1 gap-6 text-white"
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                maxLength={254}
                className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-semibold"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                maxLength={120}
                className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="What's on your mind?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                maxLength={5000}
                className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <div
              aria-hidden="true"
              className="absolute -left-[9999px]"
            >
              <label htmlFor="website">
                Leave this field empty
              </label>

              <input
                type="text"
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="mt-2">
              <div
                className="cf-turnstile"
                data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                data-theme="dark"
                data-action="contact"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" accented>
                Send Email
              </Button>
            </div>
          </form>

          {status === "success" && (
            <div
              role="status"
              className="mt-6 flex items-start gap-4 rounded-2xl border border-green-400/30 bg-green-400/10 backdrop-blur-md p-5 shadow-lg shadow-green-950/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-400/20 text-green-300">
                <span className="text-xl">✓</span>
              </div>

              <div>
                <h3 className="font-semibold text-green-200 text-lg">
                  Message sent successfully!
                </h3>
                <p className="mt-1 text-sm text-green-100/80">
                  Thanks for getting in touch. Your message has reached my inbox
                  and I&apos;ll get back to you as soon as possible.
                </p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-4 rounded-2xl border border-red-400/30 bg-red-400/10 backdrop-blur-md p-5 shadow-lg shadow-red-950/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-400/20 text-red-300">
                <span className="text-xl">!</span>
              </div>

              <div>
                <h3 className="font-semibold text-red-200 text-lg">
                  Something went wrong
                </h3>
                <p className="mt-1 text-sm text-red-100/80">
                  Your message couldn&apos;t be sent. Please try again in a moment.
                </p>
              </div>
            </div>
          )}

          {status === "captcha" && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 backdrop-blur-md p-5 shadow-lg shadow-amber-950/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                <span className="text-xl">!</span>
              </div>

              <div>
                <h3 className="font-semibold text-amber-200 text-lg">
                  Verification required
                </h3>
                <p className="mt-1 text-sm text-amber-100/80">
                  Please complete the security verification and try submitting your message again.
                </p>
              </div>
            </div>
          )}

          {status === "rate-limited" && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 backdrop-blur-md p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                <span className="text-xl">!</span>
              </div>

              <div>
                <h3 className="font-semibold text-amber-200 text-lg">
                  Too many submissions
                </h3>
                <p className="mt-1 text-sm text-amber-100/80">
                  You&apos;ve sent too many messages in a short period.
                  Please wait a little while before trying again.
                </p>
              </div>
            </div>
          )}
        </div>
      </FadeInSection>
      </div>
    </section>
  );
}

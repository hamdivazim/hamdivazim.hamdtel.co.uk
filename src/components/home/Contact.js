import FadeInSection from "../client/hooks/FadeIn";
import { FaEnvelope } from "react-icons/fa";
import Button from "../Button";
import SocialsHoriz from "../SocialsHoriz";

export default function Contact() {
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
            Want to collaborate, ask a question, or just say hi? Drop a message below and I’ll get back to you.
          </p>

          <SocialsHoriz className="justify-center sm:justify-start items-center text-3xl sm:text-2xl mb-6" />

          <form
            action="mailto:hamd.waseem@hamdtel.co.uk"
            method="POST"
            encType="text/plain"
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
                name="From"
                required
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
                name="Subject"
                required
                className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="What’s on your mind?"
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
                name="Body"
                rows="5"
                required
                className="w-full px-4 py-2 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-inner placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                placeholder="Type your message here…"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" accented>
                Send Email
              </Button>
            </div>
          </form>
        </div>
      </FadeInSection>
      </div>
    </section>
  );
}

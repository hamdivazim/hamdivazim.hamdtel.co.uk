import HomeBg from "../client/HomeBg";
import SocialsHoriz from "../SocialsHoriz";
import Button from "../Button";

export default function Landing() {
  return (
    <div className="relative bg-gradient-to-b from-indigo-950 from-60% to-blue-950 to-90% min-h-screen overflow-hidden">
      <HomeBg />

      <div
        id="landing-text"
        className="absolute bottom-40 left-1/2 -translate-x-1/2 w-full px-5 
                    sm:left-24 sm:translate-x-0 sm:bottom-40 sm:max-w-xl sm:px-0 
                    animate-fade-in z-10 text-center sm:text-left"
    >
        <h1 className="font-sans text-3xl sm:text-4xl text-white mb-4 flex justify-center sm:justify-start items-center gap-4">
            <img
            src="/assets/pfp.png"
            alt="Hamd's profile photo"
            className="w-10 h-10 rounded-full object-cover"
            />
            Hi, I&apos;m Hamd.
        </h1>
        <p className="font-mono text-lg mb-8 sm:mb-4 text-white">
            Full‑Stack Developer with experience in Python, Next.js, Swift, AI, and cloud architecting (3× AWS Certified).
        </p>

        <SocialsHoriz className="justify-center sm:justify-start items-center text-3xl sm:text-2xl" />

        <div className="mt-8 sm:mt-4 flex flex-wrap gap-4 justify-center sm:justify-start items-center">
            <Button accented href='/about'>Learn More</Button>
            <Button href='/projects'>View Projects</Button>
            <Button href='/blog'>Read Blog</Button>
        </div>
    </div>

    </div>
  );
}
import FadeInSection from "../client/hooks/FadeIn";
import { FaUser } from "react-icons/fa";
import Button from "../Button";
import Image from "next/image";

export default function MiniAbout() {
    return (
        <div className="relative bg-gradient-to-b from-blue-950 from-60% to-indigo-950 to-90% min-h-[75vh] overflow-hidden flex items-center">
            
            <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full" style={{ backgroundColor: '#800000' }} />
            <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ backgroundColor: '#16A34A' }} />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full" style={{ backgroundColor: '#EA580C' }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full" style={{ backgroundColor: '#EAB308' }} />

            <FadeInSection>
                <div className="m-6 sm:m-24 flex flex-col sm:flex-row items-center justify-between gap-8 mt-35 mb-35">
                    <div className="sm:w-2/3">
                        <h1 className="font-sans text-4xl text-white mb-4 flex items-center gap-4">
                            <FaUser className="text-blue-300" /> About Me
                        </h1>
                        <p className="font-mono text-lg text-white mb-4">
                            I&apos;ve been building apps and games since I was six. Now at age 15, I&apos;m triple‑AWS certified - passionate about Python, Swift, web and cloud development, AI and data science, and always learning something new.
                        </p>
                        <Button accented href="/about">
                            Read More
                        </Button>
                    </div>

                    <div className="sm:w-1/3 flex justify-center items-center">
                        <Image 
                            src="/assets/undraw_coding_joxb.svg" 
                            alt="Coding Illustration" 
                            width={1000}
                            height={1000}
                        />
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
}

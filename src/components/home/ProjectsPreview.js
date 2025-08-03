import FadeInSection from "../client/hooks/FadeIn";
import { FaProjectDiagram, FaGithub } from "react-icons/fa";
import Button from "../Button";
import ProjectCard from "../ProjectCard";

export default function ProjectsPreview({ prjcts }) {
  return (
    <section className="relative bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-950 min-h-screen flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full" style={{ backgroundColor: '#EAB308' }} />
    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full" style={{ backgroundColor: '#EA580C' }} />
    <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ backgroundColor: '#16A34A' }} />
    <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full" style={{ backgroundColor: '#800000' }} />

      <FadeInSection className="mb-35 mt-35 sm:mb-0 sm:mt-0">
        <div className="max-w-7xl w-full">
            <a
                href="/projects"
                className="inline-block group cursor-pointer"
            >
                <h1 className="flex items-center text-white text-4xl font-sans mb-6">
                    <FaProjectDiagram 
                    className="mr-3 transition-transform duration-300 group-hover:rotate-12" 
                    />
                    <span className="relative inline-block text-white transition-colors duration-300 group-hover:text-indigo-300">
                    Recent Projects
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                </h1>
            </a>

          <p className="text-white font-mono text-lg mb-10">
            Here are three of my most recent projects, showcasing my skills in web, mobile, game and cloud development. Click any project to learn more.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch mb-12">
            {prjcts.map((project, idx) => {
              const props = project.properties;
              return (
                    <div key={idx} className="h-full">
                        <ProjectCard props={props} />
                    </div>
                );
            })}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Button accented href="/projects">
                See More Projects
            </Button>
            <Button href="https://github.com/hamdivazim" className="flex items-center gap-x-2">
                <FaGithub />GitHub
            </Button>
            </div>

        </div>
      </FadeInSection>
    </section>
  );
}

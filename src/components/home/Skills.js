import FadeInSection from "../client/hooks/FadeIn";
import Button from "../Button";
import SkillCard from "../SkillCard";
import {
    FaHammer,
    FaAws,
    FaPython,
    FaDocker,
    FaReact,
    FaSwift,
    FaHtml5,
    FaUnity,
    FaGitAlt,
    FaDatabase,
    FaGithub
} from "react-icons/fa";
import {
    SiDart,
    SiDjango,
    SiFlutter,
    SiKotlin,
    SiNextdotjs,
    SiPytorch,
    SiTensorflow
} from "react-icons/si";


const skills = [
  { name: 'AWS (3x Certified)', icon: FaAws },
  { name: 'Python', icon: FaPython },
  { name: 'React', icon: FaReact },
  { name: 'Docker', icon: FaDocker },
  { name: 'Swift', icon: FaSwift },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'SQL', icon: FaDatabase },
  { name: 'HTML, CSS, JS', icon: FaHtml5 },
  { name: 'Unity', icon: FaUnity },
  { name: 'Kotlin', icon: SiKotlin },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Tensorflow', icon: SiTensorflow },
  { name: 'Dart', icon: SiDart },
  { name: 'Flutter', icon: SiFlutter },
  { name: 'Django', icon: SiDjango },
  { name: 'PyTorch', icon: SiPytorch }
];

export default function ProjectsPreview() {
  return (
    <section className="relative bg-gradient-to-b from-indigo-950 via-blue-900 to-blue-950 min-h-screen flex flex-col items-center justify-center overflow-hidden p-6">
    <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full" style={{ backgroundColor: '#800000' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full" style={{ backgroundColor: '#EAB308' }} />
    <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ backgroundColor: '#16A34A' }} />
    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full" style={{ backgroundColor: '#EA580C' }} />
    

      <FadeInSection className="mb-35 mt-35 sm:mb-0 sm:mt-0">
        <div className="max-w-7xl w-full">
        <h1 className="flex items-center text-white text-4xl font-sans mb-6">
                <FaHammer 
                className="mr-3" 
                />
                Skills & Achievements
            </h1>

          <p className="text-white font-mono text-lg mb-4">
            I'm experienced in a variety of programming languages, technologies, and cloud concepts, such as Python, SQL, and AWS.
          </p>


          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 px-6 py-10">
      {skills.map((skill) => (
        <div key={skill.name} className="mb-4 break-inside-avoid">
          <SkillCard icon={skill.icon} name={skill.name} />
        </div>
      ))}
    </div>


        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button href="https://github.com/hamdivazim" className="flex items-center gap-x-2" accented>
                <FaGithub />GitHub
            </Button>
                    </div>
      </FadeInSection>
    </section>
  );
}

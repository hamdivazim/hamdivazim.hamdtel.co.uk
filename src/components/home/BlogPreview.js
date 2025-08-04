import FadeInSection from "../client/hooks/FadeIn";
import { FaPenNib, FaDev, FaYoutube } from "react-icons/fa";
import Button from "../Button";
import PostCard from "../PostCard";
import Link from "next/link";

export default function ProjectsPreview({ posts }) {
  return (
    <section className="relative bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 min-h-screen flex flex-col items-center justify-center overflow-hidden p-6">
    <div className="absolute top-0 left-0 w-32 h-32 rounded-br-full" style={{ backgroundColor: '#800000' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full" style={{ backgroundColor: '#EAB308' }} />
    <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full" style={{ backgroundColor: '#16A34A' }} />
    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-tr-full" style={{ backgroundColor: '#EA580C' }} />
    

      <FadeInSection className="mb-35 mt-35 sm:mb-0 sm:mt-0">
        <div className="max-w-7xl w-full">
        <Link
            href="/blog"
            className="inline-block group cursor-pointer"
        >
            <h1 className="flex items-center text-white text-4xl font-sans mb-6">
                <FaPenNib 
                className="mr-3 transition-transform duration-300 group-hover:rotate-12" 
                />
                <span className="relative inline-block text-white transition-colors duration-300 group-hover:text-indigo-300">
                Blog
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-300 transition-all duration-300 group-hover:w-full" />
                </span>
            </h1>
        </Link>

          <p className="text-white font-mono text-lg mb-10">
            Here are some of my latest blog posts, covering topics like web development, cloud computing, and programming insights. Click any post to dive deeper.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch mb-12">
            {posts.map((post, idx) => {
              return (
                    <div key={idx} className="h-full">
                        <PostCard props={post} />
                    </div>
                );
            })}
          </div>

          

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Button accented href="/blog" className="justify-center items-center">
                Read More
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            
            <Button href="https://dev.to/hamdivazim" className="flex items-center gap-x-2">
                <FaDev />View on Dev.to
            </Button>
            <Button href="https://youtube.com/@hamdivazim" className="flex items-center gap-x-2">
                <FaYoutube />Visit YouTube Channel
            </Button>
          </div>
        </div>


        

      </FadeInSection>
    </section>
  );
}

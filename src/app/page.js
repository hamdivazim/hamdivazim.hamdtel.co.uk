import Navbar from "@/components/client/Navbar";
import Footer from "@/components/Footer";
import Landing from "@/components/home/Landing";
import MiniAbout from "@/components/home/MiniAbout";
import ProjectsPreview from "@/components/home/ProjectsPreview";
import BlogPreview from "@/components/home/BlogPreview";
import Skills from "@/components/home/Skills";
import Contact from "@/components/home/Contact";
import { getRecentProjects } from "@/components/lib/notion";
import { getRecentPosts } from "@/components/lib/devto";
//import QCBackground from "@/components/QCBackground";
import { getMeta, defaultSEO } from "@/components/lib/seo";

export const revalidate = 60;

export const metadata = getMeta(`${defaultSEO.title}`, defaultSEO.description, `${defaultSEO.rootURL}/`, defaultSEO.image);

export default async function Home({ searchParams }) {
  const projects = await getRecentProjects();
  const posts = await getRecentPosts();

  const params = await searchParams;

  return (
    <div className="font-sans">
      <Navbar />

      <main className="relative z-10">
        <Landing />
        <MiniAbout />
        <ProjectsPreview prjcts={projects} />
        <BlogPreview posts={posts} />
        <Skills />
        <Contact status={params.contact} />
      </main>
      
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

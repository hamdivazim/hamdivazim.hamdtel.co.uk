import ProjectsPage from "@/components/projects/ProjectsPage";
import { getAllProjects } from "@/components/lib/notion";
import Footer from "@/components/Footer";

import { getMeta } from "@/components/lib/seo";

export const revalidate = 3600;

export const metadata = getMeta("Projects | Hamd Waseem - Portfolio", "Hamd Waseem's Projects - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.", "https://hamdivazim.hamdtel.co.uk/projects", "/assets/banner.png");

export default async function Blog() {
    let projects;

    try {
        projects = await getAllProjects();
    } catch {
        return notFound();
    }

    return (
        <div>
            <ProjectsPage projects={projects} />

            <footer>
                <Footer />
            </footer>
        </div>
    )
}
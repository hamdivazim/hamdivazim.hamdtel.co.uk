import ProjectsPage from "@/components/projects/ProjectsPage";
import { getAllProjects } from "@/components/lib/notion";
import Footer from "@/components/Footer";

import { getMeta, defaultSEO } from "@/components/lib/seo";

export const revalidate = 3600;

export const metadata = getMeta(`Projects | ${defaultSEO.title}`, defaultSEO.description, `${defaultSEO.rootURL}/projects`, defaultSEO.image);

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
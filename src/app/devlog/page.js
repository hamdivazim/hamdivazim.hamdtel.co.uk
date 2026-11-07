import DevlogPage from "@/components/DevlogPage";
import { notFound } from "next/navigation";
import { getLatestDevlog } from "@/components/lib/notion";
import { getRecentPosts } from "@/components/lib/devto";
import Footer from "@/components/Footer";
import { getMeta, defaultSEO } from "@/components/lib/seo";

export const revalidate = 3600;

export const metadata = getMeta(`Devlog | ${defaultSEO.title}`, defaultSEO.description, `${defaultSEO.rootURL}/devlog`, defaultSEO.image);

export default async function Devlog() {
    let fullDevlog;
    let recentPosts;

    try {
        fullDevlog = await getLatestDevlog();
        recentPosts = await getRecentPosts()
    } catch {
        return notFound();
    }

    return (
        <div>
            <DevlogPage devlog={fullDevlog} recentPosts={recentPosts} />
            <footer>
                <Footer />
            </footer>
        </div>
    )
}
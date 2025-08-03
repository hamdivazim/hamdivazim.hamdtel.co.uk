import DevlogPage from "@/components/DevlogPage";
import { notFound } from "next/navigation";
import { getLatestDevlog } from "@/components/lib/notion";
import { getRecentPosts } from "@/components/lib/devto";
import Footer from "@/components/Footer";
import { getMeta } from "@/components/lib/seo";

export const revalidate = 3600;

export const metadata = getMeta("Devlog | Hamd Waseem - Portfolio", "Hamd Waseem's Devlog - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.", "https://hamdivazim.hamdtel.co.uk/devlog", "/assets/banner.png");

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
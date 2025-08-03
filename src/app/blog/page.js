import BlogHome from "@/components/blogHome/blogHome";
import { getPosts } from "@/components/lib/devto";
import Footer from "@/components/Footer";
import { getMeta } from "@/components/lib/seo";

export const revalidate = 3600;
export const metadata = getMeta("Blog | Hamd Waseem - Portfolio", "Hamd Waseem's Blog - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.", "https://hamdivazim.hamdtel.co.uk/blog", "/assets/banner.png");

export default async function Blog() {
    let posts;

    try {
        posts = await getPosts();
    } catch {
        return notFound();
    }

    return (
        <div>
            <BlogHome postsPageOne={posts} />

            <footer>
                <Footer />
            </footer>
        </div>
    )
}
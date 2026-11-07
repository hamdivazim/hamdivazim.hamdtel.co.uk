import BlogHome from "@/components/blogHome/blogHome";
import { getPosts } from "@/components/lib/devto";
import Footer from "@/components/Footer";
import { getMeta, defaultSEO } from "@/components/lib/seo";

export const revalidate = 3600;
export const metadata = getMeta(`Blog | ${defaultSEO.title}`, defaultSEO.description, `${defaultSEO.rootURL}/blog`, defaultSEO.image);

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
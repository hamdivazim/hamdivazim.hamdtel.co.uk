import { getAllSlugs, getPostBySlug, getRecentPosts } from '../../../components/lib/devto';
import { notFound } from 'next/navigation';
import PostPage from '@/components/PostPage';
import Footer from '@/components/Footer';
import { getMeta, defaultSEO } from '@/components/lib/seo';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  let post;
  try {
    let prms = await params;
    post = await getPostBySlug(prms.slug);
    return getMeta(
        post.title + ` | ${defaultSEO.title}`,
        post.description + " | " + defaultSEO.blogDescription,
        `${defaultSEO.rootURL}/blog/`+post.slug,
        post.social_image,
        "article"
    );
  } catch {
    return getMeta(defaultSEO.title, defaultSEO.description, `${defaultSEO.rootURL}/`, defaultSEO.image, "article");
  }

}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function BlogPostPage({ params }) {
  let post;
  let otherPosts;
  try {
    let prms = await params;
    post = await getPostBySlug(prms.slug);
    otherPosts = await getRecentPosts(2);
  } catch {
    return notFound();
  }

  return (
    <article className="prose mx-auto">
      <PostPage postContent={post} recentPosts={otherPosts} />

      <footer>
            <Footer />
        </footer>
    </article>
  );
}

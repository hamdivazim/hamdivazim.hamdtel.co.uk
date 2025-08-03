// app/about/page.js
import { getRecentPosts } from '@/components/lib/devto';
import { notFound } from 'next/navigation';
import AboutPage from '@/components/AboutPage';
import Footer from '@/components/Footer';
import { getMeta } from '@/components/lib/seo';

export const revalidate = 3600;

export const metadata = getMeta("About | Hamd Waseem - Portfolio", "Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.", "https://hamdivazim.hamdtel.co.uk/about", "/assets/banner.png", "profile");

export default async function About() {
  let otherPosts;
  try {
    otherPosts = await getRecentPosts(2);
  } catch {
    return notFound();
  }

  return (
    <article className="prose mx-auto">
      <AboutPage recentPosts={otherPosts} />

      <footer>
        <Footer />
    </footer>
    </article>
  );
}

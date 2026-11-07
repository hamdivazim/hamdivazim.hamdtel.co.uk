// app/about/page.js
import { getRecentPosts } from '@/components/lib/devto';
import { notFound } from 'next/navigation';
import AboutPage from '@/components/AboutPage';
import Footer from '@/components/Footer';
import { getMeta, defaultSEO } from '@/components/lib/seo';

export const revalidate = 3600;

export const metadata = getMeta(`About | ${defaultSEO.title}`, defaultSEO.description, `${defaultSEO.rootURL}/about`, defaultSEO.image, "profile");

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

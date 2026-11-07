import { FaClock } from "react-icons/fa";
import AsidePanel from "./AsidePanel";

export default function PostPage({ postContent, recentPosts }) {
  const tags = postContent.tags || [];
  const category = tags[0] || null;
  const otherTags = tags.slice(1);

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 p-6 text-white font-sans">
      <div className="mx-auto flex flex-col lg:flex-row gap-6">
        <article className="w-full lg:w-2/3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
          {postContent.cover_image && (
            <img
              src={postContent.cover_image}
              alt="Featured"
              className="w-full h-64 object-cover rounded-t-2xl"
            />
          )}

          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
            <img
              src="/assets/pfp.png"
              alt="Hamd's profile photo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col text-white">
              <span className="font-semibold text-lg">Hamd Waseem</span>
              <span className="text-sm opacity-75">
                {new Date(postContent.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="text-xs opacity-50 mt-1 flex items-center gap-1">
                <FaClock className="inline-block" />
                {postContent.reading_time_minutes} min read
                {category && <> • {category}</>}
              </span>
            </div>
          </div>

          {postContent.title && (
            <h1 className="px-6 pt-6 pb-2 text-3xl font-bold text-white">
              {postContent.title}
            </h1>
          )}

          {otherTags.length > 0 && (
            <div className="px-6 pb-6 flex flex-wrap gap-2">
              {otherTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-indigo-700 bg-opacity-50 text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose prose-lg prose-invert max-w-none px-6 pb-6"
            dangerouslySetInnerHTML={{ __html: postContent.renderedHTML }}
          />
        </article>

        <AsidePanel recentPosts={recentPosts} useNavbar />
      </div>
    </section>
  );
}

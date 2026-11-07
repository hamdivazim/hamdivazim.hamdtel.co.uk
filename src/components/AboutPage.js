import { FaClock } from "react-icons/fa";
import AboutProse from "./AboutProse";
import AsidePanel from "./AsidePanel";

export default function AboutPage({ recentPosts }) {

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 p-6 text-white font-sans">
      <div className="mx-auto flex flex-col lg:flex-row gap-6">
        
        <article className="w-full lg:w-2/3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
          <img
            src="/assets/banner.png"
            alt="Hamd's banner"
            className="w-full h-64 object-cover rounded-t-2xl"
          />

          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/10">
            <img
              src="/assets/pfp.png"
              alt="Hamd's profile photo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col text-white">
              <span className="font-semibold text-lg">Hamd Waseem</span>
              <span className="text-xs opacity-50 mt-1 flex items-center gap-1">
                <FaClock className="inline-block" />
                2 min read
              </span>
              
            </div>
          </div>

          <h1 className="px-6 pt-6 pb-2 text-3xl font-bold text-white">
            About Me
          </h1>

          <p className="px-6 pb-2 text-lg font-medium mb-1">Developer • Cloud Engineer • Creator</p>

          

          <AboutProse />

        </article>

        <AsidePanel recentPosts={recentPosts} useNavbar />
      </div>
    </section>
  );
}

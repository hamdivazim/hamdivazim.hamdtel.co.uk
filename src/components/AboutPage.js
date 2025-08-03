import { FaClock } from "react-icons/fa";
import SocialsHoriz from "./SocialsHoriz";
import PostCard from "./PostCard";
import Navbar from "./client/Navbar";
import { NavSpace } from "./client/Navbar";
import AboutProse from "./AboutProse";

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

        <aside className="w-full lg:w-1/3">
          <Navbar />
          <NavSpace />

          <div className="lg:sticky lg:top-6 flex flex-col gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-4">
                    <img
                        src="/assets/pfp.png"
                        alt="Hamd's profile photo"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col text-white">
                        <span className="font-semibold text-lg">Hamd Waseem</span>
                        <span className="text-sm opacity-75">
                            3x AWS Certified at 13 | Python | React.js | Unity | Swift
                        </span>
                        
                    </div>
                </div>
                <p className="text-sm text-white mt-4 opacity-70">
                    Passionate developer at age 14 building creative and efficient solutions across web, cloud, and mobile.
                </p>
                <SocialsHoriz className="text-3xl sm:text-2xl mt-4" />
          </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:border-white/20 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-4 text-white">Recent Posts</h2>
              {recentPosts.map((post, idx) => {
                return (
                        <div key={idx} className="h-full">
                            <PostCard props={post} className="mt-5" />
                        </div>
                    );
                })}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

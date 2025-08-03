import { FaTerminal, FaPenNib, FaGithub, FaYoutube } from "react-icons/fa";
import Button from "./Button";
import DevlogCard from "./DevlogCard";
import Navbar from "./client/Navbar";
import SocialsHoriz from "./SocialsHoriz";
import PostCard from "./PostCard";

export default function DevlogPage({ devlog, recentPosts }) {

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 p-6 text-white font-sans">
        <Navbar />

        <div className="m-2 sm:m-8">
            <h1 className="font-sans text-4xl text-white mb-4 flex items-center gap-4">
                <FaTerminal /> Devlog
            </h1>

            <p className="text-white font-mono text-lg mb-4">
                Check out the latest updates on my development on upcoming projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button href="/blog" className="flex items-center gap-x-2" accented>
                    <FaPenNib />Blog
                </Button>
                <Button href="https://github.com/hamdivazim" className="flex items-center gap-x-2" accented>
                    <FaGithub />GitHub
                </Button>
                <Button href="https://youtube.com/@hamdivazim" className="flex items-center gap-x-2">
                    <FaYoutube />YouTube Channel
                </Button>
                <Button href="https://spectacled-amethyst-e41.notion.site/23e28b160f0f800cb3beddf12bef273a" className="flex items-center gap-x-2">
                    Devlog Archive
                </Button>
            </div>

            

            <div className="mx-auto flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
                {devlog.map(log => (
                    <DevlogCard props={log.properties} key={log.id} className="mb-8" />
                ))}
            </div>

            <aside className="w-full lg:w-1/3 flex flex-col gap-6">
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
                Passionate developer at age 14 building creative and efficient
                solutions across web, cloud, and mobile.
                </p>
                <SocialsHoriz className="text-3xl sm:text-2xl mt-4" />
            </div>

             <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:border-white/20 transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-4 text-white">Recent Posts</h2>
                    {recentPosts.map((post, idx) => {
                    return (
                            <div key={idx}>
                                <PostCard props={post} className="mt-5" />
                            </div>
                        );
                    })}
                </div>
            </aside>
        </div>
        </div>

    </section>
  );
}

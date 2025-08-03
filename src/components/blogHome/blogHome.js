import { FaYoutube, FaPenNib, FaDev, FaTerminal } from "react-icons/fa";
import SocialsHoriz from "../SocialsHoriz";
import PostCard from "../PostCard";
import Navbar from "../client/Navbar";
import Button from "../Button";
import Carousel from "../client/Carousel";
import BlogSearch from "./blogSearch";
import BlogExtraPosts from "./blogExtraPosts";

export default function BlogHome({ postsPageOne }) {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 p-6 text-white font-sans">
      <div className="sm:m-6">
        <Navbar />

        <h1 className="font-sans text-4xl text-white mb-4 flex items-center gap-4">
            <FaPenNib /> Blog
        </h1>

        <p className="text-white font-mono text-lg mb-4">
            Welcome to my blog! Here I will post about many different topics regarding programming and cloud computing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button href="https://dev.to/hamdivazim" className="flex items-center gap-x-2" accented>
                <FaDev />Dev.to
            </Button>
            <Button href="https://youtube.com/@hamdivazim" className="flex items-center gap-x-2">
                <FaYoutube />YouTube Channel
            </Button>
            <Button href="/devlog" className="flex items-center gap-x-2">
                <FaTerminal />Devlog
            </Button>
        </div>

        <div className="mb-8">
            <Carousel>
            {postsPageOne.slice(0, 3).map((post) => (
                <div key={post.slug} className="shrink-0 sm:w-[48%] w-[90%]">
                <PostCard props={post} fade={false} />
                </div>
            ))}
            </Carousel>

            <div className="lg:hidden mt-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:border-white/20 transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-white">Search</h2>
            
            <BlogSearch />
            </div>
        </div>

        <div className="mx-auto flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
                {postsPageOne.map((post, idx) => (
                    <div key={idx}>
                    <PostCard props={post} className="mb-5" />
                    </div>
                ))}
                <BlogExtraPosts />
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

            <div className="hidden lg:block bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 hover:border-white/20 transition-all duration-300">
                <h2 className="text-xl font-semibold mb-4 text-white">Search</h2>
                
                <BlogSearch />
            </div>
            </aside>
        </div>
      </div>
    </section>
  );
}

import SocialsHoriz from "./SocialsHoriz";
import PostCard from "./PostCard";
import Navbar from "./client/Navbar";
import { NavSpace } from "./client/Navbar";

export function Profile() {
    return (
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
                Passionate developer at age 15 building creative and efficient
                solutions across web, cloud, and mobile.
                </p>
                <SocialsHoriz className="text-3xl sm:text-2xl mt-4" />
            </div>
    )
}

export default function AsidePanel({ recentPosts, useNavbar=false }) {
    return (
        <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            {
                useNavbar &&
                <>
                    <Navbar />
                    <NavSpace />
                </>
            }
            
            <Profile />

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
    )
}
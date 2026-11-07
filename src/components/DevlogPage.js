import { FaTerminal, FaPenNib, FaGithub, FaYoutube } from "react-icons/fa";
import Button from "./Button";
import DevlogCard from "./DevlogCard";
import Navbar from "./client/Navbar";
import AsidePanel from "./AsidePanel";

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

            <AsidePanel recentPosts={recentPosts}/>
        </div>
        </div>

    </section>
  );
}

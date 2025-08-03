import SocialsHoriz from "@/components/SocialsHoriz";
import Navbar from "@/components/client/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { FaPenNib, FaProjectDiagram } from "react-icons/fa";
import { getMeta } from "@/components/lib/seo";

export const metadata = getMeta("Hamd Waseem - Portfolio", "Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.", "https://hamdivazim.hamdtel.co.uk/", "/assets/banner.png");


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-950 via-indigo-900 to-indigo-950 text-white font-sans">
      <section className="flex-grow flex flex-col items-center justify-center p-6">
        <Navbar />

        <div className="text-center max-w-lg m-4 sm:m-8 space-y-6">
          <h1 className="text-6xl font-bold mb-4">404</h1>

          <div className="flex justify-center text-2xl mb-4">
            <SocialsHoriz />
          </div>

          <p className="text-xl">Sorry, the page you are looking for does not exist.</p>

          <Button href="/" accented>
            Go back home
          </Button>

          <div className="flex justify-center gap-4 ">
            <Button href="/blog" className="gap-2">
              <FaPenNib /> Blog
            </Button>
            <Button href="/projects" className="gap-2">
              <FaProjectDiagram /> Projects
            </Button>
          </div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

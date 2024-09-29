import React, { useEffect } from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import { Helmet } from 'react-helmet';

export default function HomePage() {
  useEffect(() => {
    document.title = "Hamd Waseem";
  }, []);

  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Helmet>
        <title>Hamd Waseem - About</title>

        <meta name="description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
        <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
        <meta property="og:title" content="Hamd Waseem's - About" />
        <meta property="og:description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
        <meta property="og:image" content="./banner.png" />
      </Helmet>

      <Navbar />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
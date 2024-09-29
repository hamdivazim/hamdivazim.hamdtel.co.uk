import React, { useEffect } from 'react';
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";

export default function HomePage() {
  useEffect(() => {
    document.title = "hamdivazim";
  }, []);

  return (
    <main className="text-gray-400 bg-gray-900 body-font">
      <Navbar />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </main>
  );
}
import React from "react";
import Socials from "./Socials";

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col-reverse items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Hi, I'm Hamd.
          </h1>
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white" style={{ marginTop: "-10px" }}>
            I build, analyse and launch.
          </h1>

          <p className="mb-8 leading-relaxed">
            I've been building apps and games since I was six, and I also love to find and analyse various interesting data sets. 
            Recently I've also begun deploying infrastructure on the cloud with AWS.
          </p>
          <div className="flex flex-col md:flex-row items-center md:justify-center space-y-4 md:space-y-0 md:space-x-4">
            <a
              href="/about"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Find Out More
            </a>
            <a
              href="#projects"
              className="inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              See My Past Work
            </a>
            <a
              href="#blog"
              className="inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              Read My Blog
            </a>
          </div>

          <Socials />
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src="./coding.svg"
          />
        </div>
      </div>

    </section>
  );
}
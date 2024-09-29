import { CodeIcon } from "@heroicons/react/solid";
import React from "react";
import { projects } from "../data";

export default function Projects() {
  return (
    <section id="projects" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
            My Projects
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Some of my latest projects built with different languages and technologies. Click on the thumbnail to see more or <a href="/projects" style={{ color: "#7F6FEA" }} id="wp-link">see all of my projects</a>.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {projects.map((project) => (
            <a
              href={project.link}
              key={project.image}
              className="sm:w-1/2 w-100 p-4">
              <div className="flex relative">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  src={project.image}
                />
                <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-95">
                  <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed">{project.description}</p>
                </div>
              </div>
            </a>
          ))}
          
          <a href="/projects" className="sm:w-1/2 w-100 p-4 relative z-10 w-full border-4 border-gray-800 bg-gray-900 opacity-100 hover:opacity-80" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">
                More Projects
              </h2>
              <h1 className="title-font text-lg font-medium text-white mb-3">
                See More 
              </h1>
              <p className="leading-relaxed">View more of my projects here.</p>
            </div>
          </a>


          
        </div>
      </div>
    </section>
  );
}
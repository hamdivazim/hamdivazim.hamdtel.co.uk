import { ArrowRightIcon } from "@heroicons/react/solid";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 md:sticky top-0 z-10" style={{ zIndex: 999 }}>
      <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">

        <div className="flex items-center justify-between w-full md:w-auto">

          <button
            className="text-white inline-flex md:hidden mr-3"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <a className="title-font font-medium text-white ml-1 text-xl" href="/">
            Hamd Waseem
          </a>

          <a
            href="/#contact"
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base ml-auto md:hidden"
          >
            Contact Me
          </a>
        </div>

        <nav
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex md:items-center md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 w-full md:w-auto flex-col md:flex-row text-base justify-center`}
        >
          <a href="/about" className="py-2 md:py-0 px-4 hover:text-white">
            About
          </a>
          <a href="/#skills" className="py-2 md:py-0 px-4 hover:text-white">
            Skills
          </a>
          <a href="/#projects" className="py-2 md:py-0 px-4 hover:text-white">
            Projects
          </a>
          <a href="/posts" className="py-2 md:py-0 px-4 hover:text-white">
            Blog
          </a>
        </nav>

        <a
          href="/#contact"
          className="hidden md:inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
}

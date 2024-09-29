import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.js';
import './index.css'
import { Helmet } from 'react-helmet';

function PostPage() {
    return (
      <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

        <Helmet>
          <title>Hamd Waseem - 404 Not Found</title>

          <meta name="description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
          <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
          <meta property="og:title" content="Hamd Waseem's - About" />
          <meta property="og:description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
          <meta property="og:image" content="./banner.png" />
        </Helmet>

        <Navbar />
        <section id="about">
        <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
              404 Not Found
            </h1>

            <p className="mb-8 leading-relaxed">
              This page was not found.
            </p>
            <div className="flex justify-center">
              <a
                href="/"
                className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Home
              </a>
              <a
                href="/posts"
                className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Blog Homepage
              </a>

            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="./404.svg"
            />
          </div>
        </div>
    </section>
      </main>
    );
}

export default PostPage;

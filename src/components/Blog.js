import { CodeIcon } from "@heroicons/react/solid";
import { projects } from "../data";
import React, { Component } from 'react';
import BlogCarousel from './BlogCarousel';


class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    // Perform fetch API call when the component is mounted
    fetch('https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(data => {
        this.setState({ data: data.slice(0, 4), loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <section id="projects" className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-10 mx-auto text-center lg:px-40">
          <div className="flex flex-col w-full mb-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" className="mx-auto inline-block w-10 mb-4">
            <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
            </svg>

            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
              My Blog
            </h1>

            <a
              href="/posts"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Blog Homepage
            </a>

            <h3>Loading...</h3>
          </div>
        </div>
        </section>
      );
    }

    if (error) {
      return (
        <section id="projects" className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-10 mx-auto text-center lg:px-40">
          <div className="flex flex-col w-full mb-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" className="mx-auto inline-block w-10 mb-4">
            <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
            </svg>

            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
              My Blog
            </h1>

            <a
              href="/posts"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
              Blog Homepage
            </a>

            <h3>An error occured while fetching latest blog posts: {error}</h3>
          </div>
        </div>
        </section>
      );
    }

    return (
      <section id="blog" className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-10 mx-auto text-center lg:px-40">
          <div className="flex flex-col w-full mb-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6" className="mx-auto inline-block w-10 mb-4">
            <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" />
            <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" />
            </svg>

            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-white">
              <a href="/posts">
                My Blog
              </a>
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              View my latest blog posts here or view the <a href="/posts" style={{ color: "#7F6FEA" }} id="wp-link">blog homepage</a>.
            </p>
          </div>

          <BlogCarousel filteredData={data} />

          
        </div>
      </section>
    );
  }
}

const PostExcerpt = ({ item }) => {
  const excerpt  = item.excerpt.rendered.replace(/<a[^>]*class="[^"]*\bmore-link\b[^"]*"[^>]*>.*?<\/a>/gi, "");

  return (
      <div className="bg-gray-800 border border-gray-700 rounded p-4">
          <a href={`/posts/${item.id}`}>
              <h2 className="text-xl font-medium text-white mb-2" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h2>
              <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
              <p className="text-indigo-500 hover:text-indigo-400">Read more</p>
          </a>
      </div>
  );
};

export default MyComponent;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar.js';
import '../index.css'
import { Helmet } from 'react-helmet';

function PostPage() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [title, setTitle] = useState(`Blog Post #${id}`);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      document.title = "Hamd Waseem's Blog"

      const fetchData = async () => {
        try {
          const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/posts/');
          if (!response.ok) {
            throw new Error(response.status);
          }
          const resp = await response.json();
          
          setData(resp);
          setTitle("");
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchData();
  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
  
    if (loading) {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <title>Hamd Waseem's Blog</title>

            <meta name="description" content="Hamd Waseem's Blog - Python, AWS, Swift, SQL and more!" />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem's Blog - Insights on Python, Swift, AWS & More" />
            <meta property="og:description" content="Visit Hamd Waseem's blog and read high quality blog posts on Python, Swift, AWS, data analytics and more! Discover insights and tutorials today!" />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-11/12">
              <div className="post-header">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                    Blog
                </h1>
                <p className="mb-8 leading-relaxed">
                    Welcome to my blog! Here I will post about many different topics regarding programming and cloud computing.
                </p>
              </div>
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      </main>
      );
    }
  
    if (error) {
        return (
            <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

            <Helmet>
              <title>Hamd Waseem's Blog</title>

              <meta name="description" content="Hamd Waseem's Blog - Python, AWS, Swift, SQL and more!" />
              <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
              <meta property="og:title" content="Hamd Waseem's Blog - Insights on Python, Swift, AWS & More" />
              <meta property="og:description" content="Visit Hamd Waseem's blog and read high quality blog posts on Python, Swift, AWS, data analytics and more! Discover insights and tutorials today!" />
              <meta property="og:image" content="./banner.png" />
            </Helmet>

                <div className="container mx-auto px-4 py-8">
                    <div>
                        <h2>An error ocurred while loading blog posts.</h2>
                        <h2>Try viewing <a href={`https://hamdivazimblog.wordpress.com/`} style={{ color: "#7F6FEA" }} id="wp-link">directly on WordPress</a>.</h2>
                    </div>
                </div>
            </main>
          );
    }

    // Function to filter posts based on search term
    const filteredData = data.filter(post => {
      return (
        post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.rendered.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    return (
      <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <title>Hamd Waseem's Blog</title>

            <meta name="description" content="Hamd Waseem's Blog - Python, AWS, Swift, SQL and more!" />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem's Blog - Insights on Python, Swift, AWS & More" />
            <meta property="og:description" content="Visit Hamd Waseem's blog and read high quality blog posts on Python, Swift, AWS, data analytics and more! Discover insights and tutorials today!" />
            <meta property="og:image" content="./banner.png" />
          </Helmet>


        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-11/12">
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                    Blog
                </h1>
                <p className="mb-8 leading-relaxed">
                    Welcome to my blog! Here I will post about many different topics regarding programming and cloud computing.
                </p>
                <input
                  type="text"
                  placeholder="Search Posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  style={{ marginBottom:"20px" }}
                />
                  {filteredData.length === 0 ? <p>No blog posts found under this search term.</p> : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredData.map((item, index) => (
                        <PostExcerpt key={index} item={item} />
                      ))}
                    
                    </div>
                  )}
              </div>
              
            </div>
          </div>
        </div>
      </main>
    );
}

const PostExcerpt = ({ item }) => {
    const excerpt  = item.excerpt.rendered.replace(/<a[^>]*class="[^"]*\bmore-link\b[^"]*"[^>]*>.*?<\/a>/gi, "");

    return (
        <div className="bg-gray-800 border border-gray-700 rounded p-4">
            <a href={`/posts/${item.id}`}>
                <img src={item.jetpack_featured_media_url} className='border border-gray-700 rounded' />
                <h2 className="text-xl font-medium text-white mb-2 mt-4" dangerouslySetInnerHTML={{ __html: item.title.rendered }}></h2>
                <h6
                  className="title-font sm:text-sm text-xs mb-4 font-medium text-white"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img src="../pfp.png" style={{ width: "30px", marginRight: "10px" }} alt="profile" />
                  <span>hamdivazim</span>
                  <span className="mx-2">&bull;</span>
                  <span>{(new Date(item.date)).toLocaleDateString()}</span>
                </h6>
                <p className="text-gray-400 mb-4" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
                <p className="text-indigo-500 hover:text-indigo-400">Read more</p>
            </a>
        </div>
    );
};

const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.87-4.87"
      />
      <circle cx={10.5} cy={10.5} r={7.5} />
    </svg>
  );
  
export default PostPage;

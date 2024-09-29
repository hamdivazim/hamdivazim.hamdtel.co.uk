import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import './index.css'

function PostPage() {
  const { id } = useParams();
  const [releasedData, setReleasedData] = useState([]);
  const [unreleasedData, setUnreleasedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/pages/47');
              if (!response.ok) {
                  throw new Error(response.status);
              }
              const resp = await response.json();

              const parser = new DOMParser();
              const doc = parser.parseFromString(resp.content.rendered, 'text/html');

              const projects = [];

              const projectDivs = doc.querySelectorAll('#wp-projects > div');

              projectDivs.forEach(div => {
                  const img = div.querySelector('img').getAttribute('src');
                  const title = div.querySelector('h1').textContent;
                  const subtitle = div.querySelector('h3').textContent;
                  const description = div.querySelector('h4').textContent;
                  const link = div.querySelector('a').getAttribute('href');
                  const tags = div.querySelector('#tags').textContent.split(',');

                  projects.push({
                      img,
                      title,
                      subtitle,
                      description,
                      link,
                      tags
                  });
              });

              // Splitting projects into released and unreleased
              const released = [];
              const unreleased = [];
              projects.forEach(project => {
                  if (project.tags[0].trim() === 'released') {
                      released.push(project);
                  } else {
                      unreleased.push(project);
                  }
              });

              setReleasedData(released);
              setUnreleasedData(unreleased);
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
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-11/12">
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Projects
                </h1>
                <p className="mb-8 leading-relaxed" style={{ marginBottom: "0px" }}>Loading...</p>


                
                
              </div>
              
            </div>
          </div>
        </div>
      </main>
      );
    }
  
    if (error) {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-11/12">
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Projects
                </h1>
                <p className="mb-8 leading-relaxed" style={{ marginBottom: "0px" }}>An error occurred while retrieving the projects. Try refreshing the page or viewing <a href="https://hamdivazimblog.wordpress.com/projects/" className="text-indigo-500 hover:text-indigo-400">directly on WordPress</a>.</p>


                
                
              </div>
              
            </div>
          </div>
        </div>
      </main>
      );
    }

    const filteredR = releasedData.filter(filt => {
      return (
        filt.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const filteredUR = unreleasedData.filter(filt => {
      return (
        filt.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    return (
      <main className="text-gray-400 bg-gray-900 body-font min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-11/12">
              <div>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
                  Projects
                </h1>
                <p className="mb-8 leading-relaxed" style={{ marginBottom: "0px" }}>These are my latest projects. Click on the card to see its project page (usually on my <a href="https://github.com/hamdivazim" className="text-indigo-500 hover:text-indigo-400">GitHub</a>).</p>


                <input
                  type="text"
                  placeholder="Search Projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  style={{ marginBottom:"20px" , marginTop:"10px"}}
                />

                <h3 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-white">Released Projects</h3>
                {filteredR.length === 0 ? <p className="mb-8 leading-relaxed">No released projects found under this search term.</p> : (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredR && filteredR.map((item, index) => (
                        <Project key={index} item={item} />
                      ))}
                    </div>

                    <br />
                  </div>
                )}

                

                <h3 className="title-font sm:text-2xl text-2xl mb-4 font-medium text-white">Upcoming Projects</h3>
                {filteredUR.length === 0 ? <p className="mb-8 leading-relaxed">No upcoming projects found under this search term.</p> : 
                  (
                    <div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredUR && filteredUR.map((item, index) => (
                          <Project key={index} item={item} />
                        ))}
                      </div>
                    </div>
                  )
                }
                
              </div>
              
            </div>
          </div>
        </div>
      </main>
    );
}

const Project = ({ item }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded p-4">
      <a href={item.link}>
        <img src={item.img} className='border border-gray-700 rounded'/>
        <h2 className="text-xl font-medium text-white mb-2" style={{ marginTop: "15px" }}>{item.title}</h2>
        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-400 mb-1">{item.subtitle}</h2>
        <p className="text-gray-400 mb-4">{item.description}</p>
        <p className="text-indigo-500 hover:text-indigo-400">See more</p>
      </a>
    </div>
  );
};

export default PostPage;

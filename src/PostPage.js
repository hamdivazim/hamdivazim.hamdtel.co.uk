import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import AllPosts from './components/AllPosts.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './index.css';
import { Helmet } from 'react-helmet';
import CusdisComments from './components/CusdisComments.js';

class Comment {
  constructor(author, authorLink, postDate, content, replies, ID, parent, profile) {
    this.author = author;
    this.authorLink = authorLink;
    this.postDate = new Date(postDate);
    this.content = content;
    this.replies = replies || [];
    this.ID = ID;
    this.parent = parent;
    this.profile = profile;
  }
}

function readingTime(tempDiv) {
  const text = tempDiv.textContent || tempDiv.innerText || "";

  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;

  // Average reading speed (wpm)
  const wordsPerMinute = 200;

  return Math.ceil(wordCount / wordsPerMinute);
}

function processContent(tempElem) {
  var temp = document.createElement('div');
  temp.innerHTML = tempElem;

  var h1Elements = temp.querySelectorAll('h1');
  h1Elements.forEach(h1 => h1.className = "title-font sm:text-4xl text-3xl mb-4 font-medium text-white");
  var h2Elements = temp.querySelectorAll('h2');
  h2Elements.forEach(h2 => h2.className = "title-font sm:text-3xl text-2xl mb-4 font-medium text-white");
  var h3Elements = temp.querySelectorAll('h3');
  h3Elements.forEach(h3 => h3.className = "title-font sm:text-2xl text-lg mb-4 font-medium text-white");
  var h4Elements = temp.querySelectorAll('h4');
  h4Elements.forEach(h4 => h4.className = "title-font sm:text-lg text-text-base mb-4 font-medium text-white");
  var h5Elements = temp.querySelectorAll('h5');
  h5Elements.forEach(h5 => h5.className = "title-font sm:text-base text-sm mb-4 font-medium text-white");
  var h6Elements = temp.querySelectorAll('h6');
  h6Elements.forEach(h6 => h6.className = "title-font sm:text-sm text-sm mb-4 font-medium text-white");

  var aElements = temp.querySelectorAll('a');
  aElements.forEach(a => a.style = "color: #7F6FEA");

  var codeElements = temp.querySelectorAll('pre');
  codeElements.forEach(code => {
    code.style = "position: relative;white-space: pre-wrap;word-wrap: break-word;overflow: auto;padding:15px;";
    code.classList.add("language-python");
    const codeContent = code.innerHTML;
    code.innerHTML = `<code class="${code.className}">${codeContent}</code>`;
  });

  return [temp.innerHTML, readingTime(temp)]
}

function createCommentsFromJSON(jsonData) {
  const commentMap = new Map();

  jsonData.forEach(item => {
    const comment = new Comment(
      item.author_name,
      item.author_url,
      item.date,
      processContent(item.content.rendered),
      [],
      item.id,
      item.parent,
      item.author_avatar_urls["24"]
    );
    commentMap.set(comment.ID, comment);
  });

  jsonData.forEach(item => {
    if (item.parent !== 0) {
      const parentComment = commentMap.get(item.parent);
      const comment = commentMap.get(item.id);
      if (parentComment) {
        parentComment.replies.push(comment);
      }
    }
  });

  return [...commentMap.values()].filter(comment => comment.parent === 0);
}

function PostPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [extras, setExtras] = useState(null);
  const [comments, setComments] = useState(null);
  const [title, setTitle] = useState(`Blog Post #${id}`);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tags, setTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const [meta, setMeta] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(true);

  const toggleTags = () => {
    setShowAllTags((prevState) => !prevState);
  };

  useEffect(() => {
    document.title = "hamdivazim - Blog Post" + " (#" + id + ")";

    const fetchData = async () => {
      try {
        const response = await fetch(`https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/posts/${id}`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const resp = await response.json();

        let date = new Date(resp.date);
        let content = processContent(resp.content.rendered);

        let featuredImageURL = resp.jetpack_featured_media_url;

        setData(content[0]);
        setTitle(resp.title.rendered);
        setExtras([date.toLocaleDateString(), content[1], featuredImageURL, resp.link]);

        setTags(resp.class_list.filter(item => item.startsWith('tag-')).map(item => item.replace('tag-', '')));

        document.title = "hamdivazim - " + resp.title.rendered + " (#" + id + ")";

        hljs.highlightAll();
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) {
      hljs.highlightAll();
      const fetchComments = async () => {
        try {
          const commentsResponse = await fetch(`https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/comments?post=${id}`);
          const commentsResp = await commentsResponse.json();
          const comments = createCommentsFromJSON(commentsResp);
          setComments(comments);

          hljs.highlightAll();
        } catch (error) {
          console.log(error);
        }
      };

      fetchComments();
    }
  }, [data, id]);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        const response = await fetch(`https://hamdivazimswblog.pythonanywhere.com/api/view/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "id": localStorage.getItem('user_token'),
          }),
        });
        const metaResponse = await response.json();
        setMeta([metaResponse.updated.views, metaResponse.updated.likes, metaResponse.liked]);
        setLoadingMeta(false);
      } catch (error) {
        console.log("Error fetching meta data:", error);
        setLoadingMeta(false);
      }
    };

    fetchMetaData();
  }, []);

  useEffect(() => {
    const modifyIframeContent = () => {
      const iframe = document.querySelector('iframe');
  
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  
        iframe.style.width = "100%";
        try {
          iframe.style.height = iframeDocument.body.scrollHeight + 10 + 'px';
        } catch (error) {
          console.log("Error fixing cusdis iframe: ",error);
        }
  
        iframeDocument.body.style.backgroundColor = "#111827";
      }
    };
  
    modifyIframeContent();
  
    const intervalId = setInterval(modifyIframeContent, 500);
  
    const observer = new MutationObserver(modifyIframeContent);
    observer.observe(document.body, { childList: true, subtree: true });
  
    return () => {
      clearInterval(intervalId);
      observer.disconnect();
    };
  }, []);
  
  const likePost = async () => {
    try {
      const response = await fetch(`https://hamdivazimswblog.pythonanywhere.com/api/like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "id": localStorage.getItem('user_token'),
        }),
      });
      const metaResponse = await response.json();
      setMeta([metaResponse.updated.views, metaResponse.updated.likes, true]);
    } catch (error) {
      console.log("Error fetching meta data:", error);
    }
  }

  if (loading) {
    return (
      <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

        <Helmet>
          <meta name="description" content={"Blog Post by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog."} />
          <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
          <meta property="og:title" content="Hamd Waseem - About" />
          <meta property="og:description" content={"Blog Post - Hamd Waseem"} />
          <meta property="og:image" content="./banner.png" />
        </Helmet>

        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="lg:flex lg:justify-center">
            <div className="lg:w-3/4">
              <div className="post-header">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">{title}</h1>
                <p className="mb-8 leading-relaxed">
                  View on WordPress at <a href={`https://hamdivazimblog.wordpress.com/?p=${id}`} style={{ color: "#7F6FEA" }} id="wp-link">hamdivazimblog.wordpress.com</a>
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
    if (!(/^\d+$/.test(id))) {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <meta name="description" content={"Blog Post by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog."} />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content={"Blog Post - Hamd Waseem"} />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

          <Navbar />
          <div className="container mx-auto px-4 py-8 text-red-300">
            <div className="bg-red-700 border border-red-900 rounded p-4">
              This ID is invalid (must be a number). Find more posts below.
            </div>
          </div>
          <AllPosts />
        </main>
      );
    } else if (error.message === "404") {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <meta name="description" content={"Blog Post by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog."} />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content={"Blog Post - Hamd Waseem"} />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

          <Navbar />
          <div className="container mx-auto px-4 py-8 text-red-300">
            <div className="bg-red-700 border border-red-900 rounded p-4">
              This blog post was not found. Find more posts below.
            </div>
          </div>
          <AllPosts />
        </main>
      );
    } else if (error.message === "401") {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <meta name="description" content={"Blog Post by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog."} />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content={"Blog Post - Hamd Waseem"} />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

          <Navbar />
          <div className="container mx-auto px-4 py-8 text-red-300">
            <div className="bg-red-700 border border-red-900 rounded p-4">
              This blog post is coming soon or is not available. Find more posts below.
            </div>
          </div>
          <AllPosts />
        </main>
      );
    } else {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <meta name="description" content={"Blog Post by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog."} />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content={"Blog Post - Hamd Waseem"} />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

          <Navbar />
          <div className="container mx-auto px-4 py-8 text-red-300">
            <div className="bg-red-700 border border-red-900 rounded p-4">
              An unknown error occurred. Find other blog posts below.
            </div>
          </div>
          <AllPosts />
        </main>
      );
    }
  }

  return (
    <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

      <Helmet>
        <meta name="description" content={`${title} by Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog.`} />
        <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
        <meta property="og:title" content="Hamd Waseem - About" />
        <meta property="og:description" content={`${title} - Hamd Waseem`} />
        <meta property="og:image" content="./banner.png" />
      </Helmet>

      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="lg:flex lg:justify-center">
          <div className="lg:w-3/4">
            <div className="post-header">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white" dangerouslySetInnerHTML={{ __html: title }}></h1>
              <p className="mb-8 leading-relaxed">
                View on WordPress at <a href={`https://hamdivazimblog.wordpress.com/?p=${id}`} style={{ color: "#7F6FEA" }} id="wp-link">hamdivazimblog.wordpress.com</a>
              </p>
            </div>

            <h4 className="title-font sm:text-xl text-lg mb-4 font-medium text-white" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="../pfp.png" style={{ width: '30px', marginRight: '10px' }} />
              <span>hamdivazim</span>
              <span className="mx-2">&bull;</span>
              <span> { extras[0] } </span>
              <span className="mx-2">&bull;</span>
              <span>
                { extras[1] } min read
              </span>
            </h4>

            <span className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>

              <span className="font-bold">{meta[0]}</span>

              {meta[2] ? (
                <span className="flex items-center space-x-1 p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                  </svg>
                  <span className="font-bold">{meta[1]}</span>
                </span>
              ) : (
                <button className="flex items-center space-x-1 hover:bg-gray-800 p-2 rounded transition duration-200" onClick={likePost}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                  </svg>
                  <span className="font-bold">{meta[1]}</span>
                </button>
              )}
            </span>

            <div className="pt-4">
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, showAllTags ? tags.length : 3).map((tag, index) => (
                  <a
                    key={index}
                    href={`https://hamdivazimblog.wordpress.com/tag/${tag}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-500 text-white py-1 px-3 rounded-full text-sm transition-all duration-300 ease-in-out transform hover:bg-indigo-600"
                  >
                    {tag}
                  </a>
                ))}

                {tags.length > 3 && (
                  <button
                    onClick={toggleTags}
                    className={`py-1 px-3 rounded-full text-sm ${
                      showAllTags
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    } transition-all duration-300 ease-in-out transform hover:scale-105`}
                  >
                    {showAllTags ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
            </div>

            <img src={extras[2]} className="rounded-lg w-1/2 pt-4" />


            <div dangerouslySetInnerHTML={{ __html: data }} style={{ color: 'white', padding: '10px' }} className="post-content" />


            <br /><br />

            <h3 class="title-font sm:text-2xl text-xl mb-4 font-medium text-white">Comments</h3>

            
            <CusdisComments
              id="cusdis_thread"
              attrs={{
                pageId: `${id}`,
                pageTitle: title,
                pageUrl: window.location.href,
              }}
            />
            

          </div>

          
        </div>
      </div>
    </main>
  );
}

export default PostPage;

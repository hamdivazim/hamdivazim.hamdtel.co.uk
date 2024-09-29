import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import AllPosts from './components/AllPosts.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './index.css';
import { Helmet } from 'react-helmet';

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

        setData(content[0]);
        setTitle(resp.title.rendered);
        setExtras([date.toLocaleDateString(), content[1]]);

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


            <div dangerouslySetInnerHTML={{ __html: data }} style={{ color: 'white', padding: '10px' }} className="post-content" />


            <br /><br />

            <div id="comments">
              <h3 className="title-font sm:text-2xl text-xl mb-4 font-medium text-white">Comments</h3>
              <p className="mb-8 leading-relaxed">
                Make comments on WordPress at <a href={`https://hamdivazimblog.wordpress.com/?p=${id}#comments`} style={{ color: "#7F6FEA" }} id="wp-link">hamdivazimblog.wordpress.com</a>
              </p>
              {comments ? (
  comments.map(comment => (
    <div key={comment.ID} className="comment bg-gray-800 p-4 mb-4 rounded-lg">
      <div className="flex items-center mb-2 text-gray-300">
        <img src={comment.profile} alt={comment.author} className="w-8 h-8 rounded-full mr-2" />
        <a href={comment.authorLink} style={{ color: "#7F6FEA" }}>{comment.author}</a>
        <span className="mx-2">&bull;</span>
        <span>{comment.postDate.toLocaleDateString()}</span>
      </div>
      <div className="comment-content text-gray-200" dangerouslySetInnerHTML={{ __html: comment.content }} />

            {comment.replies.length > 0 && (
              <details className="ml-8 mt-2">
                <summary className="text-sm text-gray-400 cursor-pointer">View {comment.replies.length} {comment.replies.length > 1 ? 'replies' : 'reply'}</summary>
                {comment.replies.map(reply => (
                  <div key={reply.ID} className="reply bg-gray-700 p-3 mt-2 rounded-lg">
                    <div className="flex items-center mb-2 text-gray-300">
                      <img src={reply.profile} alt={reply.author} className="w-6 h-6 rounded-full mr-2" />
                      <a href={reply.authorLink} style={{ color: "#7F6FEA" }}>{reply.author}</a>
                      <span className="mx-2">&bull;</span>
                      <span>{reply.postDate.toLocaleDateString()}</span>
                    </div>
                    <div className="comment-content" dangerouslySetInnerHTML={{ __html: reply.content }} />

                    {reply.replies.length > 0 && (
                      <details className="ml-8 mt-2">
                        <summary className="text-sm text-gray-400 cursor-pointer">View {reply.replies.length} {reply.replies.length > 1 ? 'replies' : 'reply'}</summary>
                        {reply.replies.map(subReply => (
                          <div key={subReply.ID} className="reply bg-gray-600 p-3 mt-2 rounded-lg">
                            <div className="flex items-center mb-2 text-gray-300">
                              <img src={subReply.profile} alt={subReply.author} className="w-6 h-6 rounded-full mr-2" />
                              <a href={subReply.authorLink} style={{ color: "#7F6FEA" }}>{subReply.author}</a>
                              <span className="mx-2">&bull;</span>
                              <span>{subReply.postDate.toLocaleDateString()}</span>
                            </div>
                            <div className="comment-content" dangerouslySetInnerHTML={{ __html: subReply.content }} />
                          </div>
                        ))}
                      </details>
                    )}
                  </div>
                ))}
              </details>
            )}
                  </div>
                ))
              ) : (
                <p>Loading comments...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PostPage;

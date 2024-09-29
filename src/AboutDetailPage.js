import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import { Helmet } from 'react-helmet';
import './index.css';

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
    fetch('https://public-api.wordpress.com/wp/v2/sites/hamdivazimblog.wordpress.com/pages/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(JSON.stringify(response.json()));
        }
        return response.json();
      })
      .then(resp => {
          var tempElement = document.createElement('div');
          tempElement.innerHTML = resp.content.rendered;

          // Select all h2 elements
          var h2Elements = tempElement.querySelectorAll('h3');

          // Apply the class to each h2 element
          h2Elements.forEach(function(h3) {
            h3.className = "title-font sm:text-2xl text-2xl mb-4 font-medium text-white";
          });
          console.log(tempElement.innerHTML);
          // Get the modified HTML string
          let data = tempElement.innerHTML;
        this.setState({ data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <title>Hamd Waseem - About</title>

            <meta name="description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

      <Navbar />
      
      <div className="container mx-auto flex px-20 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            About Me
          </h1>
          <p className="mb-8 leading-relaxed">
            View on WordPress at <a href="https://hamdivazimblog.wordpress.com/about/" style={{color:"#7F6FEA"}}>hamdivazimblog.wordpress.com</a>
          </p>
          <h2>Loading...</h2>
        </div>

        
      </div>
      
      </main>
      );
    }

    if (error) {
      return (
        <main className="text-gray-400 bg-gray-900 body-font min-h-screen">

          <Helmet>
            <title>Hamd Waseem - About</title>

            <meta name="description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

      <Navbar />
      
      <div className="container mx-auto flex px-20 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            About Me
          </h1>
          <p className="mb-8 leading-relaxed">
            View on WordPress at <a href="https://hamdivazimblog.wordpress.com/about/" style={{color:"#7F6FEA"}}>hamdivazimblog.wordpress.com</a>
          </p>
          <h2>An error occured while retrieving the About Page. View the page <a href="https://hamdivazimblog.wordpress.com/about/" style={{color:"#7F6FEA"}}>directly on WordPress</a>.</h2>
        </div>

        
      </div>
      
      </main>
      );
    }

    return (
      <main className="text-gray-400 bg-gray-900 body-font min-h-screen">


          <Helmet>
            <title>Hamd Waseem - About</title>

            <meta name="description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta name="keywords" content="blog, hamdivazim, Hamd, Hamd Waseem, Waseem, python, swift, sql, aws, database, tutorials" />
            <meta property="og:title" content="Hamd Waseem - About" />
            <meta property="og:description" content="Hamd Waseem - A 13-year-old who has built many projects using Python, Swift, Unity and more, is AWS certified and has a blog." />
            <meta property="og:image" content="./banner.png" />
          </Helmet>

      <Navbar />
      
      <div className="container mx-auto flex px-20 py-20 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            About Me
          </h1>
          <p className="mb-8 leading-relaxed">
            View on WordPress at <a href="https://hamdivazimblog.wordpress.com/about/" style={{color:"#7F6FEA"}}>hamdivazimblog.wordpress.com</a>
          </p>
          <div dangerouslySetInnerHTML={{ __html: data }} style={{color:"white",padding:"10px"}} class="post-content" />
        </div>
      </div>

        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          
        </div>
      
      </main>
    );
  }
}

export default MyComponent;


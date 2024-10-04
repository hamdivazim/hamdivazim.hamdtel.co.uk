import React from 'react';
import '../index.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PostExcerpt = ({ item }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded p-4 flex flex-col h-full">
      <a href={`/posts/${item.id}`} className="flex flex-col h-full">
        {/* Post Title */}
        <h2
          className="sm:text-xl text-md font-medium text-white mb-2 text-center" // Centre-align title
          dangerouslySetInnerHTML={{ __html: item.title.rendered }}
        ></h2>

        {/* Meta information */}
        <h6
          className="title-font sm:text-sm text-xs mb-4 font-medium text-white flex items-center justify-center" // Added justify-center to centre-align
          style={{ display: "flex", alignItems: "center" }}
        >
          <img src="../pfp.png" style={{ width: "30px", marginRight: "10px" }} alt="profile" />
          <span>hamdivazim</span>
          <span className="mx-2">&bull;</span>
          <span>{(new Date(item.date)).toLocaleDateString()}</span>
        </h6>

        {/* Excerpt */}
        <div className="flex-grow">
          <p className="text-gray-400 sm:text-md text-sm" dangerouslySetInnerHTML={{ __html: item.excerpt.rendered.replace(/<a[^>]*class="[^"]*\bmore-link\b[^"]*"[^>]*>.*?<\/a>/gi, "") }}></p>
        </div>

        {/* Read more link - ensures it's at the bottom */}
        <div className="mt-auto text-center"> {/* Centre-align Read more link */}
          <p className="text-indigo-500 hover:text-indigo-400">Read more</p>
        </div>
      </a>
    </div>
  );
};

const BlogCarousel = ({ filteredData }) => {
  // Slick slider settings
  const settings = {
    dots: true, // Show dots for pagination
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 slides at a time
    slidesToScroll: 1, // Scroll 1 slide at a time to achieve desired behavior
    responsive: [
      {
        breakpoint: 768, // Responsive settings for mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      {filteredData.length === 0 ? (
        <p>No blog posts found under this search term.</p>
      ) : (
        <Slider {...settings}>
          {filteredData.slice(0, 3).map((item, index) => (
            <div key={index} className="post-excerpt-wrapper flex justify-center items-stretch h-auto md:h-64 w-full"> {/* Changed to h-auto for mobile */}
              <PostExcerpt item={item} />
            </div>
          ))}

          {/* "Read More" Placeholder Post */}
          <div className="post-excerpt-wrapper flex justify-center items-stretch h-auto md:h-64 w-full"> {/* Same for placeholder */}
            <div className="bg-gray-800 border border-gray-700 rounded p-4 flex flex-col justify-between h-full">
              <a href="/posts" className="text-center group flex flex-col items-center justify-between h-full">
                <div className="flex flex-col items-center">
                  <h2 className="text-xl font-medium text-indigo-400 group-hover:text-indigo-300 mb-2">Read More</h2>
                  <div className="flex-grow flex items-center justify-center">
                    <p className="text-gray-400 mb-4">Read more blog posts on the blog homepage</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-auto w-16 h-16 text-indigo-400 group-hover:text-indigo-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
              </a>
            </div>
          </div>
        </Slider>
      )}
    </div>
  );
};

export default BlogCarousel;

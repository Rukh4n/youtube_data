// src/app/components/navbar/navbar.jsx
import React, { useRef } from 'react';

const Navbar = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -200, // Adjust this value to set the scroll amount
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 200, // Adjust this value to set the scroll amount
      behavior: 'smooth',
    });
  };

  return (
    <nav className="bg-black relative shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-0 bottom-0 h-full text-white bg-black bg-opacity-50 px-2 focus:outline-none z-10"
          >
            &#9664;
          </button>

          {/* Scrollable Links Section */}
          <div className="flex-grow flex justify-center overflow-hidden">
            <div
              ref={scrollRef}
              className="flex space-x-2 overflow-x-auto no-scrollbar items-center scrollbar-hide"
            >
              <a
                href="/category/all"
                className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Semua
              </a>
              <a
                href="/category/music"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Musik
              </a>
              <a
                href="/category/mixes"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Mixes
              </a>
              <a
                href="/category/news"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Berita
              </a>
              <a
                href="/category/dangdut"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Dangdut
              </a>
              <a
                href="/category/podcasts"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Podcast
              </a>
              <a
                href="/category/live"
                className="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full whitespace-nowrap"
              >
                Siaran Langsung
              </a>
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-0 bottom-0 h-full text-white bg-black bg-opacity-50 px-2 focus:outline-none z-10"
          >
            &#9654;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

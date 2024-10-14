'use client'; // Ensure this is a client-side component

import React, { useState, useEffect } from 'react';

const Search = ({ setVideos }) => {
  const [query, setQuery] = useState(''); // State for the search query
  const [error, setError] = useState(''); // State for error messages
  const [backgroundImage, setBackgroundImage] = useState('/images/simon-berger-twukN12EN7c-unsplash.jpg'); // Default background image
  const [nextBackgroundImage, setNextBackgroundImage] = useState(''); // Next background image
  const [isTransitioning, setIsTransitioning] = useState(false); // State to handle transition

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors

    try {
      // Make an API request to search for videos based on the query
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data); // Update the videos state in the parent component
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError('Terjadi kesalahan saat mengambil video.');
    }
  };

  // Function to randomly change the background image with smooth transition
  const changeBackgroundImage = () => {
    const images = [
      '/images/simon-berger-twukN12EN7c-unsplash.jpg',
      '/images/cameron-wilkins-ZofeoSz4F3k-unsplash.jpg',
      '/images/mark-harpur-K2s_YE031CA-unsplash%20(1).jpg',
      '/images/mark-harpur-K2s_YE031CA-unsplash.jpg'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    setNextBackgroundImage(randomImage); // Set the next image
    setIsTransitioning(true); // Trigger the transition
  };

  useEffect(() => {
    // Change background image every 5 seconds
    const intervalId = setInterval(() => {
      changeBackgroundImage();
    }, 5000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Once transition ends, set the new image as the background
  useEffect(() => {
    if (isTransitioning) {
      const timeoutId = setTimeout(() => {
        setBackgroundImage(nextBackgroundImage);
        setIsTransitioning(false);
      }, 1000); // Duration of the slide (1 second)

      // Clean up timeout
      return () => clearTimeout(timeoutId);
    }
  }, [isTransitioning, nextBackgroundImage]);

  return (
    <div className="relative flex justify-center items-center h-screen overflow-hidden">
      {/* Current background image with sliding out animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isTransitioning ? '-translate-x-full' : 'translate-x-0'}`}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backdropFilter: 'blur(50%)', // Apply 50% blur effect
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
        }}
      />

      {/* Next background image with sliding in animation */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isTransitioning ? 'translate-x-0' : 'translate-x-full'}`}
        style={{
          backgroundImage: `url(${nextBackgroundImage})`,
          backdropFilter: 'blur(50%)', // Apply 50% blur effect
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark overlay
        }}
      />

      {/* Content section */}
      <div className="relative z-10 w-full max-w-2xl">
        <form onSubmit={handleSearch} className='flex'>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Masukkan kata kunci..."
            className='text-lg border border-gray-300 p-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            type="submit"
            className='text-lg bg-blue-500 text-white p-2 w-auto rounded-r-md hover:bg-blue-600 transition duration-200'
          >
            Cari
          </button>
        </form>
        <div className="flex flex-col items-center mt-5">
          <p className="text-center text-white font-bold">Created By</p>
          <h1 className='text-4xl font-bold text-center text-white'>Nur Rukhan Saputra</h1>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Search;

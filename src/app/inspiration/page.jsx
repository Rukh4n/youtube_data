'use client'; // This indicates that this is a client-side component

import { useEffect, useState } from "react";
import { youtubeList } from "@/libs/youtube";
import ResultVideoSearch from "../components/search/resultVideoSearch";
import Search from "../components/search/search";
import ClientLayout from "../clientLayout";

export default function Inspiration() {
  const [videos, setVideos] = useState([]); // State for the initial list and search results
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the selected video
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  // Load video list on initial page load
  useEffect(() => {
    youtubeList() // Get initial videos on mount
      .then((datas) => {
        setVideos(datas);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        console.error("Failed to fetch videos:", err);
        setError("Failed to load videos. Please try again later.");
        setLoading(false); // Set loading to false even on failure
      });
  }, []);

  // Function to open modal and select a video
  const openModal = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <ClientLayout>
      <div className="bg-gray-900 text-white min-h-screen">
        
        {/* Full-width Search Container */}
        <div className="mb-8 w-full"> 
          <Search setVideos={setVideos} />
        </div>

        {/* Display loading message */}
        {loading && <p className="text-gray-400">Loading videos...</p>}

        {/* Display error if any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Render search results or initial video list */}
        {!loading && !error && <ResultVideoSearch videos={videos} openModal={openModal} />}

        {/* Modal for the selected video */}
        {isModalOpen && selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 p-6 rounded-lg relative w-full max-w-4xl text-white">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Video being played */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video title */}
              <h2 className="text-xl font-semibold mb-4">
                {selectedVideo.snippet.title}
              </h2>

              {/* Recommended other videos */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Rekomendasi Video Lainnya</h3>
                <div className="max-h-96 overflow-y-scroll">
                  {/* Limiting height and allowing scroll */}
                  <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                    {videos
                      .filter((video) => video.id.videoId !== selectedVideo.id.videoId)
                      .slice(0, 5)
                      .map((video) => (
                        <li
                          key={video.id.videoId}
                          className="flex items-center cursor-pointer bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md transition-colors"
                          onClick={() => openModal(video)} // Open new video in modal
                        >
                          <img
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                            className="w-24 h-auto rounded-md mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="text-md font-semibold truncate">
                              {video.snippet.title}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              Published on: {new Date(video.snippet.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClientLayout>
  );
}

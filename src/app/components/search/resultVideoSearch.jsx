import React from 'react';

const ResultVideoSearch = ({ videos, openModal }) => {
  return (
    <div className='mt-4'>
      {videos.length > 0 ? (
        <ul className="video-list grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {videos.map((video) => (
            <li
              key={video.id.videoId}
              className="video-item bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              onClick={() => openModal(video)}
            >
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className="w-full h-auto mb-4 rounded-md" />
              <h2 className="text-xl font-semibold mb-2 truncate">{video.snippet.title}</h2>
              <p className="text-gray-600">Published on: {new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Tidak ada video ditemukan.</p>
      )}
    </div>
  );
};

export default ResultVideoSearch;

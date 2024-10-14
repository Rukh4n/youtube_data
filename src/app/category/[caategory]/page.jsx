// src/app/category/[category]/page.jsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const CategoryPage = () => {
    const { category } = useParams(); // Get category from URL
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State for error handling

    // Log the captured category
    console.log('Kategori yang ditangkap:', category);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                if (category) {
                    const response = await fetch(`/api/category?category=${category}`); // Ensure the fetch URL is correct
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setVideos(data);
                } else {
                    setError('Kategori tidak ditemukan.');
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError('Terjadi kesalahan saat mengambil video.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [category]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Display error message if any
    }

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Kategori: {category}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <div key={video.id.videoId} className="video-card">
                            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                                <img src={video.snippet.thumbnails.high.url} alt={video.snippet.title} />
                                <h2 className="mt-2 text-lg">{video.snippet.title}</h2>
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada video ditemukan untuk kategori ini.</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;

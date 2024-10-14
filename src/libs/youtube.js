'use server';

import { google } from 'googleapis';

// Function to get the list of YouTube videos based on a query
export const youtubeList = async (query, maxResults = 30) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY_YOUTUBE_DATA_API;

    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey,
    });

    try {
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            maxResults,
            type: 'video', // Restrict results to video type
        });

        // Return the video data found
        return response.data.items;
    } catch (err) {
        console.error("Error in listing videos:", err.message);
        throw new Error('Failed to fetch YouTube videos');
    }
};

// Function to handle search requests
export const searchFunction = async (req, res) => {
    if (req.method === 'GET') {
        const { query } = req.query; // Get query from request

        if (!query) {
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        try {
            const results = await youtubeList(query);
            return res.status(200).json(results);
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

// function to hendle category
export const categoryFunction = async (req, res) => {
    console.log(req.query);
    if (req.method === 'GET') {
        const { category } = req.query; // Get query from request
        if (!category) {
            return res.status(400).json({ error: 'Category parameter is required' });
        }
        try {
            const results = await youtubeList(category);
            return res.status(200).json(results);
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const ytdl = require('ytdl-core');
const { getLyrics } = require('../Utils/Lyrics');

async function handleGetLyrics(req, res) {
    const { link } = req.body;

    try {
        // Validate if the link is a valid YouTube URL
        if (!ytdl.validateURL(link)) {
            return res.status(400).json({ error: 'Invalid YouTube Link!' });
        }

        // Get video details from the YouTube link
        const videoInfo = await ytdl.getInfo(link);
        const videoTitle = videoInfo.videoDetails.title; // Extract the title from the YouTube URL

        console.log(videoTitle); // Optional: Log for debugging

        // Fetch lyrics based on the video title
        const generatedLyrics = await getLyrics(videoTitle); // Add 'await' to resolve the promise

        if (!generatedLyrics) {
            return res.status(404).json({ error: 'Lyrics not found!' });
        }

        // Return the lyrics URL or content
        res.status(200).json({ lyrics: generatedLyrics });
    } catch (err) {
        console.error('Error fetching video info or lyrics:', err);
        res.status(500).json({ error: 'Failed to fetch video information or lyrics' });
    }
}

module.exports = {
    handleGetLyrics,
};

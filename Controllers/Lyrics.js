const ytdl = require('ytdl-core');
const { getLyrics,cleanSongTitle } = require('../Utils/Lyrics'); // Ensure path is correct



async function handleRoot(req,res){
    return res.status(200).send("Server is running ")
}

async function handleGetLyrics(req, res) {
    const { link } = req.body;

    try {
        // Validate if the link is a valid YouTube URL
        if (!ytdl.validateURL(link)) {
            return res.status(400).json({ error: 'Invalid YouTube Link!' });
        }

        // Get video details from the YouTube link
        const videoInfo = await ytdl.getInfo(link);
        const videoTitle = videoInfo.videoDetails?.title; // Extract the title from the YouTube URL

        // Ensure videoTitle is valid before fetching lyrics
        if (!videoTitle) {
            // return res.status(400).json({ error: 'Unable to extract video title' });
            return res.status(400).json({error:"Unable to extract video title..."})
        }

        console.log(`Fetched Video Title: ${videoTitle}`); // Optional: Log for debugging

        // Separate the artist and song title based on the format "Artist - Song Title"
        let artist, songTitle;

        // If title contains a hyphen, assume the format is "Artist - Song"
        if (videoTitle.includes(' - ')) {
            [artist, songTitle] = videoTitle.split(' - ');
        } else {
            // If no hyphen is found, try other parsing methods (e.g., common separators or cleaning further)
            artist = videoInfo.videoDetails.author.name; // Use the channel name as artist fallback
            songTitle = videoTitle;
        }

        // Clean the extracted song title
        songTitle = cleanSongTitle(songTitle);

        // Make sure both artist and songTitle are extracted correctly
        if (!artist || !songTitle) {
            return res.status(400).json({ error: 'Unable to extract artist and song title from video title.' });
        }

        // Fetch lyrics based on the artist and song title
        const generatedLyrics = await getLyrics(artist, songTitle); // Pass both artist and songTitle

        if (!generatedLyrics) {
            return res.status(404).json({ error: 'Lyrics not found!' });
        }

        // Return the fetched lyrics in the response
        return res.status(200).json({ lyrics: generatedLyrics });
    } catch (err) {
        console.error('Error fetching video info or lyrics:', err.stack); // Log stack for better error visibility
        return res.status(500).json({ error: 'Failed to fetch video information or lyrics' });
    }
}

module.exports = {
    handleGetLyrics,
    handleRoot
};

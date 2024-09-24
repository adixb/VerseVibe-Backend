const axios = require('axios');

// Helper function to clean song titles
function cleanSongTitle(songTitle) {
    if (!songTitle) {
        console.error('Song title is undefined or empty!');
        return ''; // Return an empty string if the title is undefined or empty
    }

    return songTitle
        .replace(/[\–|\|()]+/g, '')  // Remove pipes, em dashes, parentheses
        .replace(/official video/gi, '')  // Remove "Official Video"
        .replace(/official audio/gi, '')  // Remove "Official Audio"
        .replace(/lyric video/gi, '')    // Remove "Lyric Video"
        .replace(/EP/gi, '')// Remove "EP"
        .replace(/by/gi,'-')             
        .trim();                         // Trim leading and trailing spaces
}

// Function to search for lyrics using the Lyrics.ovh API
async function getLyrics(artist, songTitle) {
    try {
        // Clean the song title
        const cleanedTitle = cleanSongTitle(songTitle);
        console.log(`Searching lyrics for: ${cleanedTitle} by ${artist}`);

        // Search for the lyrics using the Lyrics.ovh API
        const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(cleanedTitle)}`,{
            timeout:10000
        });

        // Check if lyrics are returned
        const lyrics = response.data.lyrics;

        // Return the lyrics if found, or a message indicating no lyrics were found
        if (lyrics && lyrics.trim()) {
            return lyrics.trim();
        } else {
            return 'No lyrics found for the given song title.';
        }
    } catch (err) {
        // Log error details for better troubleshooting
        console.error('Error fetching lyrics:', err.message);

        // Provide more user-friendly error messages
        if (err.response && err.response.status === 404) {
            return 'No lyrics found for the given artist and song title.';
        } else {
            return 'Failed to fetch lyrics due to an error with the service.';
        }
    }
}

module.exports = {
    getLyrics,
};

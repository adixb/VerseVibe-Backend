const axios = require('axios');


function cleanSongTitle(songTitle) {
    if (!songTitle) {
        console.error('Song title is undefined or empty!');
        return ''; 
    }

    
    let cleanedTitle = songTitle
        .replace(/[\–|\|()]+/g, '')  
        .replace(/official music video/gi, '')  
        .replace(/official video/gi, '')        
        .replace(/official audio/gi, '')        
        .replace(/lyric video/gi, '')           
        .replace(/ep/gi, '')                 
        .trim();                                

    
    const artistIndex = cleanedTitle.lastIndexOf('-');
    if (artistIndex !== -1) {
        const artist = cleanedTitle.slice(artistIndex + 1).trim();
        const title = cleanedTitle.slice(0, artistIndex).trim();
        return `${title} - ${artist}`; 
    }

    return cleanedTitle;  
}

// Function to search for lyrics using the Lyrics.ovh API
async function getLyrics(artist, songTitle) {
    try {
  
        const cleanedTitle = cleanSongTitle(songTitle);
        console.log(`Searching lyrics for: ${cleanedTitle} by ${artist}`);

  
        const response = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(cleanedTitle)}`, {
            
        });

      
        const lyrics = response.data.lyrics;


        if (lyrics && lyrics.trim()) {
            return lyrics.trim();
        } else {
            return 'No lyrics found for the given song title.';
        }
    } catch (err) {
        // Log error details for better troubleshooting
        console.error('Error fetching lyrics:', err.message);

        // Provide more user-friendly error messages based on response
        if (err.response) {
            if (err.response.status === 404) {
                return 'No lyrics found for the given artist and song title.';
            } else {
                console.error('API response error:', err.response.data);
                return `Error fetching lyrics: ${err.response.statusText || 'Service error'}.`;
            }
        } else {
            return 'Failed to fetch lyrics due to a network or service issue.';
        }
    }
}

module.exports = {
    getLyrics,
    cleanSongTitle
}

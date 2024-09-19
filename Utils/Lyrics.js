const axios = require('axios');
const cheerio = require('cheerio');
const dotenv = require('dotenv');

dotenv.config();

const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN; // Ensure this matches your .env variable name

// Function to search for lyrics and scrape the lyrics text using the Genius API
async function getLyrics(songTitle) {
    try {
        // Search for the song on Genius using their API
        const searchResponse = await axios.get(`https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`, {
            headers: {
                Authorization: `Bearer ${GENIUS_ACCESS_TOKEN}`,
            },
        });

        const hits = searchResponse.data.response.hits;
        if (hits.length > 0) {
            const lyricsUrl = hits[0].result.url; // URL of the lyrics page on Genius

            // Fetch the lyrics page HTML
            const lyricsPage = await axios.get(lyricsUrl);

            // Load the HTML into cheerio for parsing
            const $ = cheerio.load(lyricsPage.data);

            // Extract the lyrics text from multiple containers
            let lyrics = '';
            $('[data-lyrics-container]').each((i, el) => {
                lyrics += $(el).text().trim() + '\n\n'; // Adding line breaks between sections
            });

            // If no lyrics are found, return a default message
            if (!lyrics) {
                lyrics = 'Lyrics not found on the page';
            }

            // Return the cleaned lyrics
            return lyrics.trim();
        } else {
            throw new Error('Lyrics not found in Genius search results');
        }
    } catch (err) {
        console.error('Error fetching lyrics:', err.message);
        return null;
    }
}

module.exports = {
    getLyrics,
};

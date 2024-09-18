const dotenv = require('dotenv') ; 
const ytdl = require('ytdl-core') ; 



dotenv.config() ; 


async function handleGetLyrics(req, res) {
    const { link } = req.body;
  
    try {
      // Validate if the link is a valid YouTube URL
      if (!ytdl.validateURL(link)) {
        return res.status(400).json({ error: 'Invalid YouTube Link!' });
      }
  
      // Gets all the data from the YouTube URL, and we need the title of the video
      const videoInfo = await ytdl.getInfo(link);
      const videoTitle = videoInfo.videoDetails.title; // Extract the title from the YouTube URL
  
      console.log(videoTitle); // Optional: You can log for debugging purposes
  
      // Return the title or lyrics based on your needs (currently returning video title)
      res.status(200).json({ videoTitle });
    } catch (err) {
      console.error('Error fetching video info:', err); // Fixed variable name
      res.status(500).json({ error: 'Failed to fetch video information' });
    }
  }
  
module.exports={
    handleGetLyrics,
}
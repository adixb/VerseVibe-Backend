const express = require('express');
const { handleGetLyrics } = require('../Controllers/Lyrics'); // Make sure this path is correct

const router = express.Router(); 

// POST - Handle Lyrics Generation
router.post('/getLyrics', handleGetLyrics);

// Export the router to use in your server
module.exports = router;

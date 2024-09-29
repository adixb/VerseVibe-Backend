const express = require('express');
const { handleGetLyrics,handleRoot } = require('../Controllers/Lyrics'); // Make sure this path is correct

const router = express.Router(); 


router.get('/',handleRoot)

// POST - Handle Lyrics Generation
router.post('/getLyrics', handleGetLyrics);

// Export the router to use in your server
module.exports = router;

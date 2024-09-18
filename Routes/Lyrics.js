const express = require('express') ;
const {handleGetLyrics} = require('../Controllers/Lyrics')





const router = express.Router() ; 
//GET 




// POST

router.post('/getLyrics', handleGetLyrics);





//PUT 




//DELETE

module.exports=router ; 
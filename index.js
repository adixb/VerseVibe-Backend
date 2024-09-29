const express = require('express'); 
const cors = require('cors');
const dotenv = require('dotenv');
const LyricsRouter = require('./Routes/Lyrics'); // Ensure path is correct

dotenv.config(); 

// Declarations
const app = express(); 
const PORT_NUMBER = process.env.PORT || 8000;

// Middlewares
app.use(cors({
    origin: 'https://verse-vibe-smoky.vercel.app/', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
}));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

// API Endpoints
app.use('/api/lyrics', LyricsRouter);



// Start server
app.listen(PORT_NUMBER, () => {
    console.log(`Server is running on ${PORT_NUMBER}`);
});

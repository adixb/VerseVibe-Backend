const express = require('express') ; 
const cors = require('cors')
const dotenv = require('dotenv') 

dotenv.config() ; 

const app = express() ; 
const PORT_NUMBER = process.env.PORT || 8000

app.use(cors({
    origin:["https://localhost:3000/"],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true,
})) ; 
app.use(express.urlencoded({extended:true})) ; 

app.listen(PORT_NUMBER,()=>{console.log(`Server is running on ${PORT_NUMBER}`)}) 


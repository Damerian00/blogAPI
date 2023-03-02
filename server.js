require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express(); 

const PORT = process.env.PORT || 3600;

async function connect() {
    try {
       await mongoose.connect(process.env.mongoDB_URI);
       console.log("Connected to MongoDB");
    } catch (err) {
        console.error(err);
    }
    app.listen(PORT, ()=> {
        console.log(`Listening on http://localhost:${PORT} `);
    }) 
}

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const blogRouter = require('./routes/blogRouter');

app.use('/blogs', blogRouter);

connect();




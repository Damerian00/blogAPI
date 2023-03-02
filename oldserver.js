const cors = require('cors');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3600;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const blogRouter = require('./routes/blogRouter');

app.use('/blogs', blogRouter);



app.listen(PORT, ()=> {
    console.log(`Listening on http://localhost:${PORT} `);
}) 
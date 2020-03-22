const express = require('express');

const Joi = require('joi');


const app = express();
app.use(express.json());

const genres = [
    {id:1, name : 'Adventure' },
    {id:2, name : 'Chinese' },
    {id:3, name : 'Detective' },
    {id:4, name : 'Christian' },
];

//GET(  Returns a list of genres )
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//GET(  Returns a single movie with specific id   )
app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if( !genre ) return res.status(404).send('Error:Movie Genre with the given id not found');
    res.send(genre);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});





















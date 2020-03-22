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

//POST
app.post('/api/genres/', (req, res) => {
    const { error } = validateGenre(req.body);//Object destructuring syntax
    if( error ) return res.status(400).send(error.details[0].message); 
    
    /*
    *Read the genre object
    *Use its propertise to create a new genre object
    *Then add the new genre object to the genre array
    */
    const genre = {
        //get the number of elements in the genre array, add one to it
        id: genres.length + 1,
        name: req.body.name
    };
    // Push the genre object to the array of genres
    genres.push(genre);
    res.send(genre);
});


//PUT(UPDATE)
//Because we are dealing with a spoecific course:we need need a course id
app.put('/api/genres/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if( !genre ) return res.status(404).send('Error: Genre with the given id not found');
    const { error } = validateGenre(req.body);  //Object destructuring feature
    if( error ){
        res.status(400).send(error.details[0].message); 
        return; 
    } 
    //Look through find if genre exist
    genre.name = req.body.name;
    res.send(genre);
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

//better way of validating would be
function validateGenre(genre) {
    const schema  = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}




















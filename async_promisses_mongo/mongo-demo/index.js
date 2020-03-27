const  mongoose = require('mongoose');
const chalk = require('chalk');


mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true })
.then(()=> console.log(chalk.yellow('Connected to the Database')))
.catch(() => console.log('Database connection unsuccessful...,err'));



//Schema defining the shape of the documentr in our mongo db database
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags:[String],
    date:{type: Date, default: Date.now},
    isPublished: Boolean
});


//MODELS
//Classes and object

//Course: is the singlar name of the collection that this model is for
const Course = mongoose.model('Course', courseSchema);

//Saving to the database

async function createCourse(){
    const course = new Course({
        name: 'Java',
        author: 'Allan',
        tags: ['learn Java', 'Backend end'],
        isPublished: true
    });
    const result = await course.save();
    console.log(result);  
}
createCourse();

//Function to query a database for a couse
 async function getCourses(){
        const courses = await Course
        .find({author: 'Onencan', isPublished: true})
        .limit(10)
        .sort({ name: 1})
        .select({ name: 1, tags: 1})
        .listenerCount({ name: 2});
        console.log(courses);
    }
getCourses();
//Function to update a course from the database

async function updateCourse(id){
    const course = await Course.findById(id);
        if(!course) return ;
    course.isPublished = true;
    course.author = 'Anather Author';
}

updateCourse('5e7dca629669ae13bcbe2f61');
//COMPARISON QUERY OPERAORS
/*
eq-Equal
ne=Not Equal
gt=greater than
gte=greater than or equal to
lt less than
lte=less than or equal to
in=in
nin=not in

*/
/*
async function getCourses(){
    const courses = await Course
    //Quering courses less than or equal to 10 and less than or equal to 20
    .find({price: { $gte: 10, $lte: 20}})
    //Quering courses that asre either 10, 20, 30 dollars
    .find({price: { $in: [10,20,30]}})
    .limit(10)
    .sort({ name: 1})
    .select({ name: 1, tags: 1})
    .listenerCount({ name: 2});
    console.log(courses);
}
getCourses();
*/

//LOGICAL QUERY OPERATORS
/*async function getCourses(){
    //or
    //and
    const courses = await Course
    .find()
    .or([ { author: 'Onencan'},{ isPublished: true}])
    .and();
   
    console.log(courses);
}
getCourses();
*/

//QUERING WITH REGULAR EXPRESSION
/*
async function getCourses(){
    const courses = await Course
    //Represents a string whose author starts with Allan
    .find({ author: /^Allan/})
    

    //Represents a string whose author ends with Hamedani
    .find({ author: /Hamedami$/i})


    //Query any string with the word Mosh
.find({  author: /.*Emmy.*/
    // i});
    
//     console.log(courses);
// }
// getCourses();


// */

//FUNCTION TO UPDATE A COURSE FROM THE DATABASE 












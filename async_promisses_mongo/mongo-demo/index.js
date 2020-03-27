const  mongoose = require('mongoose');
const chalk = require('chalk');


mongoose.connect('mongodb://localhost/playground', { useUnifiedTopology: true })
.then(()=> console.log(chalk.yellow('Connected to the Database')))
.catch(() => console.log('Database connection unsuccessful...,err'));
console.log(chalk.blue("Hello, world!"));


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


// //Quering from the database
// async function getCourses(){
//         //find the courses that are 10 dollars
//      const course = await Course
//         // .find({author: 'Onencan', isPublished: true };
//         //COMPARISON QUERY OPERATORS;
//         // Courses that are 10 dolars less than 20
//         .find({ price: {$gt:10, $lte:20}})
//         .find({ price: { $in: [10, 20, 30]}})
//         //Courses whose authors starts with Mosh
//         .find({ author: /^Mosh/ })
//         //Courses whose authors ends with Mosh 
//         .find({ author: /Hamedami$/i})// i makes it case insensitive
//         //Courses that contains the word Mosh
//         .find({ author: /.*Mosh/ })
//         .find()
//         .or([ { author: Mosh}, { isPublished: true}])
//         .limit(10)
//         .sort({ name: 1})
//         .select({ name: 1, tags: 1});
//      console.log(course);
// }

// getCourses();



//Comparision Query Operators
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

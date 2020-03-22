const express = require('express');
const helmet = require('helmet');
const startupDebugger = require('debug')('app:startup');
//Debug database related moudles
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const Joi = require('joi');

const genres = require('./routes/genres');
const homeRoute = require('./routes/homeRoute');

// const logger = require('./logger');
// const auth = require('./athenticate');
const app = express();

//Setting templating engine
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended : true }));

app.use(express.json());
//last middle ware is static: serve statis files
app.use(express.static('public'));
//Morgan logs http request
app.use(morgan('tiny'));

//Middleware functions that set HTTP response headers.
app.use(helmet());

app.use('/api/genres', genres);
app.use('/', homeRoute);

//Defining working environment/ development, staging,testing/
if(app.get('env') === 'development'){
app.use(morgan('tiny'));
startupDebugger('Morgan Enabled...');
}

//Db work
dbDebugger('Connected to the database');


//Creating a custom middle ware
app.use(function log(req, res, next) {
    console.log('Logging......');
    next();
}
);
app.use(function auth (req, res, next) {
    console.log('Authentication......');
    next();
});










module.exports = router;












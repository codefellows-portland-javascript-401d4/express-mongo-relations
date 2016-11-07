const express = require('express');
const app = express();
const movies = require('./routes/movies');
const actors = require('./routes/actors');
const errorHandler = require('./error-handler');

app.use('/movies', movies);
app.use('/actors', actors);

app.use(errorHandler);

module.exports = app;
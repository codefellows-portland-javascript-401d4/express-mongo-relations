const express = require('express');
const app = express();
const movies = require('./routes/movies');
const actors = require('./routes/actors');
const errorHandler = require('./error-handler');
const morgan = require('morgan');
const auth = require('./routes/auth');

const ensureAuth = require('./auth/ensure-auth')();
const ensureRole = require('./auth/ensure-role');



app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/movies', ensureAuth, movies);
app.use('/actors', ensureAuth, ensureRole('admin'), actors);

app.use(errorHandler);

module.exports = app;
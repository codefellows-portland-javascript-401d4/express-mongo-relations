const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');
const artists = require('./routes/artists');
const shows = require('./routes/shows');

app.use(morgan('dev'));

app.use('/api/artists', artists);

app.use('/api/shows', shows);

app.use(errorHandler);

module.exports = app;


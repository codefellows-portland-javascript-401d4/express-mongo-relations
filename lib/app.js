'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const artists = require('./routes/artists');
const works = require('./routes/works');

app.use('/artists', artists);
app.use('/works', works);

app.use(errorHandler);

module.exports = app;

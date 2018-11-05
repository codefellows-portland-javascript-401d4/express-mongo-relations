'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const artists = require('./routes/artists');
const movements = require('./routes/movements');

app.use('/artists', artists);
app.use('/movements', movements);

app.use(errorHandler);

module.exports = app;

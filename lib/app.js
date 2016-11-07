'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const games = require('./routes/games');
const characters = require('./routes/characters');

app.use('/games', games);
app.use('/characters', characters);
app.use(errorHandler);

module.exports = app;
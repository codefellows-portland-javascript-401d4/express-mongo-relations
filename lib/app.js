const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const ships = require('./routes/ships');
const characters = require('./routes/characters');
const capitals = require('./routes/capitals');

app.use('/api/ships', ships);
app.use('/api/characters', characters);
app.use('/api/capitals', capitals);
app.use(errorHandler);

module.exports = app;
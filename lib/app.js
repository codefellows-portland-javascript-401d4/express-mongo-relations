const express = require('express');
const trees = require('./trees');
const animals = require('./animals');
const app = express();

// routes go here
app.use('/api/trees', trees);
app.use('/api/animals', animals);

module.exports = app;
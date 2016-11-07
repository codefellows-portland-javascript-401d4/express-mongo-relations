const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const roasters = require('./routes/ships');
const varietals = require('./routes/characters');
const pubDir = path.join(__dirname, '../public');

app.use('/api/ships', ships); //TODO
app.use('/api/crew', crew); //TODO
app.use(errorHandler);

module.exports = app;
//routes + app.use
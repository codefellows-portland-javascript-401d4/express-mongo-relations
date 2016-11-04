const express = require('express');
const app = express();

const errorHandler = require('./error_handler');

const teams = require('./routes/teams');
const players = require('./routes/players');


app.use('/api/teams', teams);
app.use('/api/players', players);

app.use(errorHandler);

module.exports = app;

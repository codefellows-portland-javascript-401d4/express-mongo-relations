const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const players = require('./routes/players');
const teams = require('./routes/teams');

app.use(morgan('dev'));

app.use('/api/players', players);
app.use('/api/teams', teams);

app.use(errorHandler);

module.exports = app;
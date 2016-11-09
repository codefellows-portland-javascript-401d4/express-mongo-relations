const express = require('express');
const app = express();
const errorHandler = require('./lib/error-handler')
const morgan = require('morgan');

const teams = require('./lib/routes/teams');
const coaches = require('./lib/routes/coaches');

app.use(morgan('dev'));

app.use('/api/teams', teams);
app.use('/api/coaches', coaches);

app.use(errorHandler);

module.exports = app;
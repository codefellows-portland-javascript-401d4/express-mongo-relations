const express = require('express');
const app = express();
const errorHandler = require('./error-handler')
const morgan = require('morgan');

const teams = require('./routes/teams');
const coaches = require('./routes/coaches');

app.use(morgan('dev'));

app.use('/api/teams', teams);
app.use('/api/coaches', coaches);

app.use(errorHandler);

module.exports = app;
const express = require('express');
const app = express();
const errorHandler = require('./errorhandler');
const cats = require('./routes/cats');
const herds = require('./routes/herds');

app.use('/api/cats', cats);
app.use('/api/herds', herds);
app.use(errorHandler);

module.exports = app;
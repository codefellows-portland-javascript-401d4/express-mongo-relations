const express = require('express');
const app = express();
const morgan = require('morgan');
const log = morgan('dev');
const animeshows = require('./routes/animeshows');
const animechars = require('./routes/animechars');
const errorHandler = require('./error-handler');

app.use(log);
app.use(errorHandler);

app.use('/animeshows', animeshows);
app.use('/animechars', animechars);


module.exports = app;
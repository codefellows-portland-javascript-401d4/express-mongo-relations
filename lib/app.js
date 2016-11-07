const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

//TODO: require in routehandlers here

const houses = require('./routes/houses');
const roommates = require('./routes/roommates');

app.use(morgan('dev'));

//TODO: app.use('route', routehandler)

app.use('/houses', houses);
app.use('/roommates', roommates);

app.use(errorHandler);

module.exports = app;
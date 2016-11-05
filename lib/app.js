const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

//TODO: require in routehandlers here

app.use(morgan(dev));

//TODO: app.use('route', routehandler)

app.use(errorHandler);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const aptBuildings = require('./routes/aptBuildings');
const apartmentUnits = require('./routes/apartmentUnits');
const app = express();
const log = morgan('dev');

app.use(log);

app.use('/api/aptBldgs', aptBuildings);

app.use('/api/apartmentUnits', apartmentUnits);

app.use(errorHandler);

module.exports = app;

const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');
const cities = require('../routes/cities');
const countries = require('../routes/countries');

app.use('/cities', cities);
app.use('/countries', countries);
app.use(errorHandler);

module.exports = app;
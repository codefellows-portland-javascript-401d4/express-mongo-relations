const express = require('express');
const houses = require('./routes/houses');
const nobles = require('./routes/nobles');
const app = express();

// routes go here
app.use('/api/westeros/houses', houses);
app.use('/api/westeros/nobles', nobles);

module.exports = app;
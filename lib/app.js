const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');
const cityRoutes = require('./routes/cityRoutes');
const countryRoutes = require('./routes/countryRoutes');

app.use('/cities', cityRoutes);
app.use('/countries', countryRoutes);
app.use(errorHandler);

module.exports = app;

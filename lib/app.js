const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');
const cityRoutes = require('./routes/cityRoutes');
const countryRoutes = require('./routes/countryRoutes');

const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth');
const ensureRole = require('./auth/ensure-role');

const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/auth', auth);

app.use('/cities', ensureAuth, cityRoutes);
app.use('/countries', ensureAuth, ensureRole('adminCountry', 'super-country'), countryRoutes);
app.use(errorHandler);

module.exports = app;

'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const auth = require('./routes/auth');
const artists = require('./routes/artists');
const movements = require('./routes/movements');

const ensureAuth = require('./auth/ensure-auth')();
const ensureRole = require('./auth/ensure-role');

app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/artists', artists);
app.use('/movements', ensureAuth, movements);

app.use(errorHandler);

module.exports = app;

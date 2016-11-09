'use strict';

const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const auth = require('./routes/auth');
const artists = require('./routes/artists');
const movements = require('./routes/movements');

const ensureAuth = require('./auth/ensure-auth');
const ensureRole = require('./auth/ensure-role');

app.use('/auth', auth);
app.use('/artists', ensureAuth, artists);
app.use('/movements', ensureAuth, movements);

app.use(errorHandler);

module.exports = app;

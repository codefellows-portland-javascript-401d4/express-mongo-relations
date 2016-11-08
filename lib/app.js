'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const errorHandler = require('./error-handler');
const games = require('./routes/games');
const characters = require('./routes/characters');
const auth = require('./routes/auth');
const ensureAuth = require('./auth/ensure-auth')();

app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/games', games);
app.use('/characters', ensureAuth, characters);
// app.use('/admin/characters', ensureAuth, characters);
app.use(errorHandler);

module.exports = app;
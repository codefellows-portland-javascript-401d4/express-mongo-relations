const express = require('express');
const app = express();

const errorHandler = require('./error_handler');

const auth = require('./routes/auth');
const teams = require('./routes/teams');
const players = require('./routes/players');

const ensureAuth = require('./auth/ensure_auth')();

const ensureRole = require('./auth/ensure_role');

app.use('/api/auth', auth);


app.use('/api/players', ensureAuth, players);
app.use('/api/teams', ensureAuth, ensureRole('admin'), teams);


app.use(errorHandler);

module.exports = app;

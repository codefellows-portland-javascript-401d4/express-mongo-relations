const express = require('express');
const app = express();
const errorHandler = require('./error-handler');

const artists = require('./routes/artists');
const records = require('./routes/records');

app.use('/api/artists', artists);
app.use('/api/records', records);
app.use(errorHandler);

module.exports = app;
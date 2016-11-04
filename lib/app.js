const express = require('express');
const app = express;
const morgan = morgan;
const log = morgan('dev');
const animeshow = require(./routes/animeshow);
const animechar = require(./routes/animechar);


app.use(log);

app.use('/animeshow', animeshow);
app.use('/animechar', animechar);


module.exports = app;
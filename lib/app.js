/** Created by Gloria Anholt on 11/4/16. **/

const express = require('express');
const app = express();

const errorHandler = require('./error-handler');
const beer = require('./routes/beerRouter');
const brewery = require('./routes/breweryRouter');

app.use('/api/beer', beer);
app.use('/api/brewery', brewery);
app.use(errorHandler);

module.exports = app;

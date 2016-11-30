const express = require('express');
const app = express();

const BigFleas = require('./routes/big-flea-routes');
const LittleFleas = require('./routes/little-flea-routes');

const errorHandler = require('./error-handler');

// routes from browser / Postman access point ...
app.use('/BigFleas', BigFleas); // route to big fleas collection
app.use('/LittleFleas', LittleFleas); // route to little fleas collection

// error handler ...
app.use(errorHandler);

module.exports = app;

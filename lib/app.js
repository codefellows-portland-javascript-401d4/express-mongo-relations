const express = require('express');
const app = express();
const errorHandler = require('./error-handler');
const morgan = require('morgan');

const bookChar = require('./routes/bookchar');
const books = require('./routes/books')

app.use(morgan('dev'));

app.use('/characters', bookChar);
app.use('/books', books);

app.use(errorHandler);

module.exports = app;
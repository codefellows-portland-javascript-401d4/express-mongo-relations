const express = require('express');
const app = express();
const notes = require('./routes/notes');
const reminders = require('./routes/reminders');
const errorHandler = require('./error-handler');

app.get('/', (request, response) => {
  response.send('Working!');
});

app.use('/notes', notes);
app.use('/reminders', reminders);
app.use(errorHandler);

module.exports = app;

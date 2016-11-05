const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const notes = require('./routes/notes');
const tags = require('./routes/tags');
//const webArticles = require('./routes/webArticles');
const errHandler = require('./errHandler');

const app = express();
const indexHtml = fs.createReadStream('./public/index.html');

//paths
//NOTE: app statements are executed in descending order
app.use(morgan('dev'));

app.use('/notes', notes);
app.use('/tags', tags);
//app.use('web-articles', web-articles);

//serves index.html if GET for '/'
app.get('/', (req, res) => {
  indexHtml.pipe(res);
});

//400 handling
app.use((req, res) => {
  const mistake = {code: 400, error: 'no path by that name, please check your map.'};
  errHandler(mistake, req, res);
});

//catching the errors
app.use(errHandler);

module.exports = app;
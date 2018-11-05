const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const notes = require('./routes/notes');
const tags = require('./routes/tags');
const webArticles = require('./routes/web-articles');
const auth = require('./routes/auth');
const errHandler = require('./errHandler');

//create middleware for ensureAuth - no params, no different configurations
const ensureAuth = require('./auth/ensure-auth')();
//ensure middleware factory takes one or more roles
const ensureRole = require('./auth/ensure-role');

const app = express();
const indexHtml = fs.createReadStream('./public/index.html');

//paths
//NOTE: app statements are executed in descending order
app.use(morgan('dev'));

app.use('/auth', auth);
app.use('/notes', ensureAuth, notes);
app.use('/tags', ensureAuth, ensureRole('admin', 'super-user'), tags);
app.use('/web-articles', webArticles);

//serves index.html if GET for '/'
app.get('/', (req, res) => {
  indexHtml.pipe(res);
});

//400 handling
app.use((req, res, next) => {
  const mistake = {code: 400, error: 'no path by that name, please check your map.'};
  next(mistake);
});

//catching the errors
app.use(errHandler);

module.exports = app;
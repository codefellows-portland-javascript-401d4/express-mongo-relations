const express = require('express');
const app = express;
const morgan = morgan;
const log = morgan('dev');


app.use(log);

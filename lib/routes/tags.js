const express = require('express');
const bodyParser = require('body-parser').json();

const Tag = require('../models/tag');

const router = express.Router();

router
  //serves all tags if GET req for '/tags'
  .get('/', (req, res, next) => {
    Tag.find
  })
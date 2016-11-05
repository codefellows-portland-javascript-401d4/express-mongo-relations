const express = require('express');
const bodyParser = require('body-parser').json();

const Tag = require('../models/tag');

const router = express.Router();

router
  //serves all tags if GET req for '/tags'
  .get('/', (req, res, next) => {
    Tag.find()
      .then((data) => {
        if (data.length === 0) {
          res.send({message: 'There are no tags, add some!'});
        }else{
          res.send(data);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
  //serves specific tag if GET for specifici id
  .get('/:id', (req, res, next) => {
    Tag.findById(req.params.id)
      .then((data) => {
        let mistake = {};
        //if tag does not exist
        if (!data) {
          mistake.code = 404;
          mistake.error = 'That tag does not exist. Perhaps you meant to create a new tag?';
        }
      })
  })
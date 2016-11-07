const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Character = require('../models/character');

router
  .get('/', (req, res, next) => {
    Character.find()
      .then(chars => res.send(chars))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Character.findById(req.params.id)
      .then(char => res.send(char))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Character(req.body).save()
      .then(newChar => res.send(newChar))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Character.findByIdAndUpdate(req.params.id, req.body)
      .then(old => res.send(old))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Character.findByIdAndRemove(req.params.id)
      .then(char => res.send(char))
      .catch(next);
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Ship = require('../models/ship');

router
  .get('/', (req, res, next) => {
    Ship.find()
      .then(chars => res.send(chars))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Ship.findById(req.params.id)
      .then(char => res.send(char))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Ship(req.body).save()
      .then(newChar => res.send(newChar))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Ship.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(newShip => res.send(newShip))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Ship.findByIdAndRemove(req.params.id)
      .then(char => res.send(char))
      .catch(next);
  });

module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Show = require('../models/show');

router
  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.genre) query.genre = req.query.genre;
    Show.find(query)
      .then(shows => res.send(shows))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Show.findById(req.params.id)
      .then(show => res.send(show))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Show.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Show(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Show.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;

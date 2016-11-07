const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Record = require('../models/record');

router
  .get('/', (req, res, next) => {
    Record.find({})
      .lean()
      .populate('artistId', 'name -_id')
      .then(records => res.send(records))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Record.findById(req.params.id)
      .populate({
        path: 'artistId',
        select: 'name -_id'
      })
      .lean()
      .then(records => res.send(records))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Record.remove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Record(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Record.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(saved => res.send(saved))
      .catch(next);
  });

  module.exports = router;
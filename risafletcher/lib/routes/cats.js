const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Cats = require('../models/cats');

router

  .get('/', (req, res, next) => {
      const query = {};

      if(req.query.legs) query.legs = req.query.legs;

      Cats.find()
        .select('name herdId')
        .populate({
          path: 'herdId',
          select: 'name'
      })
        .lean()
        .then(cats => res.send(cats))
        .catch(next);
  })

  .get('/:id', (req, res, next) => {
      Cats.findById(req.params.id)
        .then(cats => res.send(cats))
        .catch(next);
  })

  .get('/legs/:number', (req, res, next) => {
      Cats.find({legs: req.params.number})
        .then(cats => res.send(cats))
        .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      Cats.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
      new Cats(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
  })

  .put('/:id', bodyParser, (req,res,next) => {
      Cats.findByIdAndUpdate(req.params.id, req.body)
        .then(saved => res.send(saved))
        .catch(next);
  });

module.exports = router;
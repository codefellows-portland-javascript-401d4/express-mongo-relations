const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Herds = require('../models/herds');
const Cats = require('../models/cats');

router

  .get('/', (req, res, next) => {
      const query = {};

      if(req.query.legs) query.legs = req.query.legs;

      Herds.find(query)
        .then(herds => res.send(herds))
        .catch(next);
  })

  .get('/:id', (req, res, next) => {
      const herdId = req.params.id;

      Promise
        .all([
            Herds.findById(herdId).lean(),

            Cats
                .find({herdId})
                .select('name')
                .lean()
        ])
        .then(([herds, cats]) => {
            herds.cats = cats;
            res.send(herds);
        })
        .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      Herds.removeById(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
      new Herds(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
  })

  .put('/:id', bodyParser, (req,res,next) => {
      Herds.findByIdAndUpdate(req.params.id, req.body)
        .then(saved => res.send(saved))
        .catch(next);
  })
  .put('/:herdId/cats/catId', bodyParser, (req,res,next) => {
      Cats.findById(req.params.catId)
        .then(cats => {
            cats.herdId = req.params.herdId;
            return cats.save();
        })
        .then(cats => res.send(cats))
        .catch(next);
  });

module.exports = router;
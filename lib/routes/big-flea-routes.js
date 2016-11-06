const express = require('express');
const bodyParser = require('body-parser').json();
const router = express.Router();

const BigFlea = require('../models/big-flea-schema');
const LittleFlea = require('../models/little-flea-schema');

router
  .get('/', (req, res, next) => {
    BigFlea.find()
      .then(bigfleas => res.send(bigfleas))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    const fleaId = req.params.id;
    Promise
      .all([
        // get big flea data
        BigFlea.findById(fleaId).lean(),
        // get little fleas
        LittleFlea
          // only on this big flea
          .find({fleaId})
          // limit data to subtype and color
          .select('subtype color')
          .lean()
      ])
      .then(([bigflea, littlefleas]) => {
        // append little fleas to big flea being returned
        bigflea.littlefleas = littlefleas;
        res.send(bigflea);
      })
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new BigFlea(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    BigFlea.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:fleaId/littlefleas/littlefleasId', bodyParser, (req, res, next) => {
    BigFlea.findByIdAndUpdate(req.params.littlefleasId)
      .then(littleflea => {
        littleflea.fleaId = req.params.fleaId;
        return littleflea.save();
      })
        .then(littleflea => res.send(littleflea))
        .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    BigFlea.removeById(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  });

module.exports = router;

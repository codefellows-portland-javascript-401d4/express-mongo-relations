const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Artist = require('../models/artist');

router
  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.name) query.name = req.query.name;
    Artist.find(query)
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Artist.findById(req.params.id)      
      .populate({
        path: 'artistId'
      })
      .then(artist => res.send(artist))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Artist.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
    new Artist(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyParser, (req, res, next) => {
    Artist.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;
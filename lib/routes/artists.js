const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Artist = require('../models/artist');

router

  .get('/', (req, res, next) => {
    const query = {};
    if(req.query.genre) query.genre = req.query.genre;
    Artist.find(query)
      .select('name genre type showId')
      .populate({
        path: 'showId',
        select: 'name'
      })
      .lean()
      .then(artists => res.send(artists))
      .catch(next);
  })

  .get('/averageShows', (req, res, next) => {
    Artist.find({})
      .then(artists => {     
        let sum = 0;
        artists.forEach(function(artist) {
          sum += artist.shows;
        });
        let avg = sum/artists.length;
        res.send({average: avg});
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Artist.findById(req.params.id)
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
    Artist.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  });

module.exports = router;

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Player = require('../models/player');

router
  //all players sorted by homers
    .get('/hrLeaders', (req, res, next) => {
      Player.find({}).sort('-homers')
                .then(players => res.send(players ))
                .catch(next);
    })

    .get('/', (req, res, next) => {
      Player.find()
            .select('name position homers teamId')
            .populate({
              path: 'teamId',
              select: 'team'
            })
            .lean()
            .then(players => res.send(players ))
            .catch(next);
    })

     .get('/:id', (req, res, next) => {
       Player.findById(req.params.id)
       .select('name position homers teamId')
            .populate({
              path: 'teamId',
              select: 'team'
            })
            .lean()
            .then(player => res.send(player ))
            .catch(next);
     })

    .delete('/:id', (req, res, next) => {
      Player.removeById(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
      new Player(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
      Player.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
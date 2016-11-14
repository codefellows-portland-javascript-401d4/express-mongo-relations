const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Team = require('../models/team');
const Player = require('../models/player');

router
 //all teams sorted by wins
    .get('/winsLeaders', (req, res, next) => {
      Team.find({}).sort('-wins')
                .then(teams => res.send(teams ))
                .catch(next);
    })

    .get('/', (req, res, next) => {
      const query = {};

      if(req.query.league) query.league = req.query.league;

      Team.find(query)
            .then(teams => res.send(teams ))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
      Team.findById(req.params.id)
            .then(team => res.send(team ))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
      Team.removeById(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })
    .post('/', bodyParser, (req, res, next) => {
      new Team(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
      Team.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    })

  //"joins" player with team
  .put('/:teamId/players/:playerId', bodyParser, (req, res, next) => {
    Player.findById(req.params.playerId)
            .then(player => {
              player.teamId = req.params.teamId;
              return player.save();
            })
            .then(player => res.send(player))
            .catch(next);
  });

module.exports = router;
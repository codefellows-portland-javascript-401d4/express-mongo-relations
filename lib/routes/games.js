'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('../body-parser')();
const Game = require('../models/game');
const Character = require('../models/character');

router
    .get('/', (req, res, next) => {
        const query = {};

        if(req.query.developer) query.developer = req.query.developer;

        Game.find(query)
            .then(games => res.send(games))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const gameId = req.params.id;

        Promise
            .all([
                Game.findById(gameId).lean(),
                Character
                    .find({ gameId })
                    .select('name')
                    .lean()
            ])
            .then(([game, characters]) => {
                game.characters = characters;
                res.send(game);
            })
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Game(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(saved => res.send(saved))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Game.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;
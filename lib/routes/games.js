'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('../body-parser')();
const Game = require('../models/game');

router
    .get('/', (req, res, next) => {
        const query = {};

        if(req.query.developer) query.developer = req.query.developer;

        Game.find(query)
            .then(games => res.send(games))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Game.findById(req.params.id)
            .then(game => res.send(game))
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
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser').json();

const Player = require('../models/player');

router
    .get('/', (req, res, next) => {
        Player.find()
            .select('playerName position teamId')
            .populate({
                path: 'teamId',
                select: 'teamName wins losses'
            })
            .lean()
            .then(players => res.send(players))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Player.findById(req.params.id)
            .select('playerName position teamId')
            .populate({
                path: 'teamId',
                select: 'teamName wins losses'
            })
            .lean()
            .then(player => res.send(player))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Player.findByIdAndRemove(req.params.id)
            .then(removed => res.send(removed))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Player(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Player.findByIdAndUpdate(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(next);

    });



module.exports = router;

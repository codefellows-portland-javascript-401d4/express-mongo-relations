'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('body-parser').json();
const Character = require('../models/character');
const ensureRole = require('../auth/ensure-role');

router
    .get('/', (req, res, next) => {
        const query = {};

        if(req.query.sex) query.sex = req.query.sex;

        Character.find(query)
            .populate({
                path: 'gameId',
                select: 'name'
            })
            .lean()
            .then(characters => res.send(characters))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Character.findById(req.params.id)
            .then(character => res.send(character))
            .catch(next);
    })

    .post('/', ensureRole('admin'), bodyParser, (req, res, next) => {
        new Character(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', ensureRole('admin'), bodyParser, (req, res, next) => {
        Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(saved => res.send(saved))
            .catch(next);
    })

    .delete('/:id', ensureRole('admin'), (req, res, next) => {
        Character.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;
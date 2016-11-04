'use strict';

const express = require('express');
const router = express.Router(); //eslint-disable-line
const bodyParser = require('../body-parser')();
const Character = require('../models/character');

router
    .get('/', (req, res, next) => {
        const query = {};

        Character.find(query)
        .then(characters => res.send(characters))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Character.findById(req.params.id)
        .then(character => res.send(character))
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Character(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Character.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(saved => res.send(saved))
        .catch(next);
    })

module.exports = router;
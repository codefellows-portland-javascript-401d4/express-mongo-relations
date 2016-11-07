'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Movement = require('../models/movement');
const Artist = require('../models/artist');

router 
    .get('/', (request, response, next) => {
        const query = {};

        if(request.query.name) query.name = request.query.name;

        Movement.find(query)
            .then(movement => response.send(movement))
            .catch(next);
    })

    .get('/:id', (request, response, next) => {
        const movementId = request.params.id;

        Promise
            .all([
               Movement.findById(movementId).lean(),
               Artist
                .find({ movementId })
                .select('name')
                .lean()
            ])
            .then(([movement, artist]) => {
                movement.artist = artist;
                response.send(movement);
            })
            .catch(next);
    })

    .post('/', bodyParser, (request, response, next) => {
        new Movement(request.body).save()
            .then(saved => response.send(saved))
            .catch(next);
    })

    .delete('/:id', (request, response, next) => {
        Movement.findByIdAndRemove(request.params.id)
            .then(deleted => response.send(deleted))
            .catch(next);
    })

    .put('/:id', bodyParser, (request, response, next) => {
        Movement.findByIdAndUpdate(request.params.id, request.body)
            .then(saved => response.send(saved))
            .catch(next);
    });

module.exports = router;

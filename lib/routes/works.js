'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Painting = require('../models/painting');

router 
    .get('/', (request, response, next) => {
        const query = {};

        if (request.query.name) query.name = request.query.name;

        Painting.find(query)
            .then(painting => response.send(painting))
            .catch(next);
    })

    .get('/:id', (request, response, next) => {
        Painting.findById(request.params.id)
            .then(painting => response.send(painting))
            .catch(next);
    })

    .post('/', bodyParser, (request, response, next) => {
        new Painting(request.body).save()
            .then(saved => response.send(saved))
            .catch(next);
    })

    .delete('/:id', (request, response, next) => {
        Painting.findByIdAndRemove(request.params.id)
            .then(deleted => response.send(deleted))
            .catch(next);
    })

    .put('/:id', bodyParser, (request, response, next) => {
        Painting.findByIdAndUpdate(request.params.id, request.body)
            .then(saved => response.send(saved))
            .catch(next);
    });

module.exports = router;

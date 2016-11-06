'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Painter = require('../models/painter');

router 
    .get('/', (request, response, next) => {
        const query = {};

        if(request.query.name) query.name = request.query.name;

        Painter.find(query)
            .then(artist => response.send(artist))
            .catch(next);
    })

    .get('/:id', (request, response, next) => {
        Painter.findById(request.params.id)
            .then(artist => response.send(artist))
            .catch(next);
    })

    .post('/', bodyParser, (request, response, next) => {
        new Painter(request.body).save()
            .then(saved => response.send(saved))
            .catch(next);
    })

    .delete('/:id', (request, response, next) => {
        Painter.findByIdAndRemove(request.params.id)
            .then(deleted => response.send(deleted))
            .catch(next);
    })

    .put('/:id', bodyParser, (request, response, next) => {
        Painter.findByIdAndUpdate(request.params.id, request.body)
            .then(saved => response.send(saved))
            .catch(next);
    });

module.exports = router;

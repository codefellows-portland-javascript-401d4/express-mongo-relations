'use strict';

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Artist = require('../models/artist');
const ensureRole = require('../auth/ensure-role');

router 
    .get('/', (request, response, next) => {
        const query = {};

        if(request.query.name) query.name = request.query.name;

        Artist.find()
            .select('name birthdate movementId')
            .populate({
                path: 'movementId',
                select: 'name'
            })
            .lean()
            .then(artists => response.send(artists))
            .catch(next);    
    })

    .get('/:id', (request, response, next) => {
        Artist.findById(request.params.id)
            .select('name birthdate movementId')
            .then(artist => response.send(artist))
            .catch(next);    
    })

    .post('/', ensureRole('admin'), bodyParser, (request, response, next) => {
        new Artist(request.body).save()
            .then(saved => response.send(saved))
            .catch(next);
    })

    .delete('/:id', ensureRole('admin'), (request, response, next) => {
        Artist.findByIdAndRemove(request.params.id)
            .then(deleted => response.send(deleted))
            .catch(next);
    })

    .put('/:id', ensureRole('admin'), bodyParser, (request, response, next) => {
        Artist.findByIdAndUpdate(request.params.id, request.body, { new: true })
            .then(saved => response.send(saved))
            .catch(next);
    });

module.exports = router;

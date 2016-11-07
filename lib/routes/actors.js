const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Actor = require('../models/actor-model');

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.name) query.name = req.query.name;
        Actor.find(query)
        .select('name gender academyAward movieId')
        .populate({
            path: 'movieId',
            select: 'title'
        })
        .lean()
        .then(actors => res.send(actors))
        .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Actor.findById(req.params.id)
            .select('name gender academyAward movieId')
            .populate({
                path: 'movieId',
                select: 'title'
            })
            .lean()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .get('/aa/:aa', (req, res, next) => {
        Actor.find({academyAward: req.params.aa})
            .select('name gender academyAward movieId')
            .populate({
                path: 'movieId',
                select: 'title'
            })
            .lean()
            .then(actors => res.send(actors))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Actor.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Actor(req.body).save()
            .then(saved => {
                console.log('saved', saved);
                res.send(saved);})
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Actor.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;  
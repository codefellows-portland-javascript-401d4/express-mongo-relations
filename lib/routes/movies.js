const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Movie = require('../models/movie-model');

router
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.genre) query.genre = req.query.genre;
        if(req.query.title) query.genre = req.query.title;
        Movie.find(query)
            .then(movies => res.send(movies))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Movie.findById(req.params.id)
            .then(movies => res.send(movies))
            .catch(next);
    })

    .get('/aa/:aa', (req, res, next) => {
        Movie.find({academyAward: req.params.aa})
            .then(movies => res.send(movies))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Movie.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Movie(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Movie.findByIdAndUpdate(req.params.id, req.body)
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;  
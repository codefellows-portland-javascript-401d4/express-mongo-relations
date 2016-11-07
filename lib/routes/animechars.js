const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser').json();
const url = require('url');
const qs = require('qs');
const Animechar = require('../models/animechar');
const Animeshow = require('../models/animeshow');

router  
    .get('/', (req, res, next) => {
        const queryString = (qs.parse(url.parse(req.url).query));
        const query = {};
        const subQuery = {};
        if (req.query.name) query.name = req.query.name;
        Animechar
            .find(query)
            .populate({
                path: 'showId',
                select: 'showname'
            })
            .lean()
            .then(animechars => res.send(animechars))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Animechar
            .findById(req.params.id)
            .then(animechar => res.send(animechar))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Animechar.findByIdAndRemove(req.params.id)
            .then(animechars => res.send(animechars))
            .catch(next);
    })

    .put('/:id', bodyparser, (req, res, next) => {
        Animechar.findByUpdateAndRemoev(req.params.id, req.body, {new: true})
            .then(update => res.send(update))
            .catch(next);
    })

    .post('/', bodyparser, (req, res, next) => {
        new Animechar(req.body).save()
            .then(newpost => res.send(newpost))
            .catch(next);
    });

module.exports = router;


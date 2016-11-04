const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const url = require('url');
const qs = require('qs');


router  
    .get('/', (req, res, next) => {
        const queryString = (qs.parse(url.parse(req.url).query));
        const query = {};
        const subQuery = {};
        if (req.query.name) query.name = queryString;
        Animechar.find(query)
            .then(animechars => res.send(animechars))
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


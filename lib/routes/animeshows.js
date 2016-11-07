const express = require('express');
const router = express.Router();
const url = require('url');
const qs = require('qs');
const bodyparser = require('body-parser').json();
const Animeshow = require('../models/animeshow');
const Animechar = require('../models/animechar');

router  
    .get('/', (req, res, next) => {
        const queryString = (qs.parse(url.parse(req.url).query));
        const query = {};
        const subQuery = {};
        if (req.query.name) query.name = req.query.name;
        Animeshow.find(query)
            .then(animeshow => res.send(animeshow))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const showId = req.params.id;
        Promise
            .all([
                Animechar
                    .find({showId})
                    .lean(),
                Animeshow
                    .findById(showId)
                    .select('showname airdate genre')
                    .lean()
            ])
            .then(([chars, show]) => {
                show.characters = chars;
                res.send(show);
            })
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Animeshow.findByIdAndRemove(req.params.id)
            .then(animeshow => res.send(animeshow))
            .catch(next);
    })

    .put('/:id', bodyparser, (req, res, next) => {
        Animeshow.findByUpdateAndRemoev(req.params.id, req.body, {new: true})
            .then(update => res.send(update))
            .catch(next);
    })

    .put('/:showid/character/:characterid', bodyparser, (req, res, next) => {
        Animechar
            .findById(req.params.characterid)
            .then(character => {
                character.showId = req.params.showid;
                return character.save();
            })
            .then(character => {
                res.send(character);
            })
            .catch(next);
    })

    .post('/', bodyparser, (req, res, next) => {
        new Animeshow(req.body).save()
            .then(newpost => res.send(newpost))
            .catch(next);
    });

module.exports = router;


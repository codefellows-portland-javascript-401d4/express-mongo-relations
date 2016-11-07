const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Roommate = require('../models/roommate');

router.get('/', (req, res, next) => {
    const query = {};

    for (var key in req.query) {
        query[key] = req.query[key];
    }

    Roommate.find()
        .select('name gender houseId')
        .populate({
            path: 'houseId',
            select: 'name address'
        })
        .lean()
        .then(roommates => res.send(roommates))
        .catch(next);
})

    .get('/:id', (req, res, next) => {
        Roommate.findById(req.params.id)
        .then(roommate => res.send(roommate))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Roommate.removeByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Roommate(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Roommate.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(saved => res.send(saved))
            .catch(next);
    });

module.exports = router;
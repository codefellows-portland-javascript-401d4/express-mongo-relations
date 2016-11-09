const express = require ('express');
const router = express.Router();

const bodyParser = require('body-parser').json();
const Coach = require('../models/coach');

router
    .get('/', (req, res, next) => {
        // const query = {};

        // if(req.query.rank) query.conference = req.query.rank;

        // Coach.find(query)
        Coach.find()
            .select('coachName')
            .lean()
            .then(coaches => res.send(coaches))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Coach.findById(req.params.id)
            .then(coach => res.send(coach))
            .catch(next);
    })

    .delete('/:id', (req,res, next) => {
        Coach.findByIdAndRemove(req.params.id)
            .then(removed => res.send(removed))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Coach(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Coach.findbyByIdAndUpdate(req.params.id, req.body)
            .then(updated => res.send(updated))
            .catch(next);
    });

module.exports = router;
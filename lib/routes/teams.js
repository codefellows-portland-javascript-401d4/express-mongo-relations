const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Team = require('../models/team');

router
    .get('/', (req, res, next) => {
        Team.find()
            .select('name')
            .lean()
            .then(teams => res.send(teams))
            .catch(next);
        // const query = {};

        // if(req.query.rank) query.conference = req.query.rank;

        // Team.find(query)
        //     .then(teams => res.send(teams))
        //     .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Team.findById(req.params.id)
            .then(team => res.send(team ))
            .catch(next);
    })

    .delete('/:id', (req,res, next) => {
        Team.findByIdAndRemove(req.params.id)
            .then(removed => res.send(removed ))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Team(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Team.findbyByIdAndUpdate(req.params.id, req.body)
            .then(updated => res.send(updated))
            .catch(next);
    });

module.exports = router;
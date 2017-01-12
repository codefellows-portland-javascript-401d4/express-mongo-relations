const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();

const Team = require('../models/team');
const Coach = require('../models/coach');

router
    .get('/', (req, res, next) => {
        Team.find()
            .select('teamName conference wins coachId')
            .populate({
                path: 'coachId',
                select: 'coachName'
            })
            .lean()
            .then(teams => res.send(teams))
            .catch(next);        
    })

    .get('/:id', (req, res, next) => {
        Team.findById(req.params.id)
            .then(team => res.send(team))
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
            .select('teamName coachId')
            .populate({
                path: 'coachId',
                select: 'coachName'
            })
            .then(updated => res.send(updated))
            .catch(next);
    })

    .put('/:teamId/coaches/coachId', bodyParser, (req, res, next) => {
        Coach.findById(req.params.coachId)
            .then(coach => {
                coach.teamId = req.params.teamId;
                return coach.save();
            })
            .then(coach => res.send(coach))
            .catch(next);
    });

module.exports = router;
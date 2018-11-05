const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const ApartmentUnit = require('../models/apartmentUnit');

router 
    .get('/', (req, res, next) => {
        console.log('router GET all');
        const query = {};
        ApartmentUnit.find(query)
            .then(apartments => res.send(apartments))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        console.log('router GET one');
        ApartmentUnit.findById(req.params.id)
        .then(apartment => res.send(apartment))
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        console.log('router DELETE');
        ApartmentUnit.findByIdAndRemove(req.params.id)
        .then(removed => res.send(removed))
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        console.log('router POST');
        new ApartmentUnit(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        console.log('router PUT');
        ApartmentUnit.findByIdAndUpdate(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(next);
    });

module.exports = router;


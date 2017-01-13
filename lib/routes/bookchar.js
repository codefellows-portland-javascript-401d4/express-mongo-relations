const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Character = require('../models/bookchar');

router
    .post('/', bodyParser, (req, res, next)=> {
        new Character(req.body).save()
        .then(saved => res.send( saved ))
        .catch(next);
    })

    .get('/', (req, res, next) => {
        const query = {}; 

        // if(req.query.name) query.name = req.query.name;

        Character.find(query)
            .then(characters => res.send(characters ))
            .catch(next);
    })

    .get('/sortbybooks', (req, res, next) => {
        const query = {}; 

        Character.find(query)
            .sort({ nbrBooks: 1 })
            .then(characters => res.send(characters ))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Character.findById(req.params.id)
            .populate('book')
            .then(character => res.send(character ))
            .catch(next);
    })


    .put('/:id', bodyParser, (req, res, next)=> {
        new Character(req.body).save()
            .then(saved => res.send(saved ))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Character.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted ))
            .catch(next);
    })


module.exports = router;
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const AptBldg = require('../models/aptBldg');
const ApartmentUnit = require('../models/apartmentUnit');


router 
    .get('/vacancies', (req, res, next) => {
        console.log('router GET vacancies');

        AptBldg.find({vacantunits: {$gt: 0}})
            .then(aptbldgs => {
                let vacancies = aptbldgs.reduce(function(prev, curr) {
                    return prev + curr.vacantunits;
                },0);
                let results = {'Total Vacant Apartments': vacancies};
                res.send(results);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        console.log('router GET all');
        const query = {};

        // for a passed query, we are assuming it is a max number of units
        // we need to add one to the passed in value so we can use less than
        if (req.query.maxunits) query.nbrunits = {$lt: parseInt(req.query.maxunits) + 1 };
        // if (query.nbrunits) console.log(query);

        AptBldg.find(query)
            .then(aptbldgs => res.send(aptbldgs))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        console.log('router GET one');
        let bldgId = req.params.id;

        Promise
            .all([
                AptBldg.findById(bldgId).lean(),
                ApartmentUnit.find({bldgId})
                .select('name location totalsize nbrbdrms nbrbaths').lean()
            ])
        .then(([aptbldg, apartments]) => {
            aptbldg.apartments = apartments;
            res.send(aptbldg);
        })
        .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        console.log('router DELETE');
        AptBldg.findByIdAndRemove(req.params.id)
        .then(removed => res.send(removed))
        .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        console.log('router POST');
        new AptBldg(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        console.log('router PUT');
        AptBldg.findByIdAndUpdate(req.params.id, req.body)
        .then(updated => res.send(updated))
        .catch(next);
    });


module.exports = router;


const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const Country = require('../models/country');
const City = require('../models/city');

router
    .get('/', (req, res, next) => {
        let query = {};
        if(req.query) {
            query = req.query;
        }
        Country.find(query)
            .then(countries => {
                res.send(countries);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const countryId = req.params.id;
        Promise
            .all([
                Country.findById(countryId).lean(),
                City
                    .find({countryId})
                    .select('-languages')
                    .lean()
            ])
            .then(([country, cities]) => {
                country.cities = cities;
                res.send(country);
            })
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        Country.remove({})
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        const countryId = req.params.id;
        Country.findByIdAndRemove(countryId)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        const countryData = req.body;
        new Country(countryData).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        const countryId = req.params.id;
        const countryData = req.body;
        Country.findByIdAndUpdate(countryId, countryData, {new: true, runValidators: true})
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:countryId/cities/:cityId', jsonParser, (req, res, next) => {
        // console.log('params', req.params);
        const cityId = req.params.cityId;
        const countryId = req.params.countryId;
        // Country.findById(countryId)
        //     .then(country => {
        //         console.log('count', country);
        //     });
        City.findById(cityId)
            .then(city => {
                // console.log('cit', city);
                city.countryId = countryId;
                return city.save();
            })
            .then(city => res.send(city))
            .catch(next);
    });

module.exports = router;
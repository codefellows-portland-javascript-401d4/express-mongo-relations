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
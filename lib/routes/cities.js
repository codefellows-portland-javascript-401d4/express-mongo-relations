const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const City = require('../models/city');

router
    .get('/', (req, res, next) => {
        let query = {};
        if(req.query) {
            query = req.query;
        }
        City.find(query)
            .select('name population countryId')
            .populate({
                path: 'countryId',
                select: 'name'
            })
            .lean()
            .then(cities => {
                res.send(cities);
            })
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        const cityId = req.params.id;
        City.findById(cityId)
            .then(city => res.send(city))
            .catch(next);
    })

    // .get('/language/:language', (req, res, next) => {
    //     const languageId = req.params.id;
    //     City.findByLanguage(languageId)
    //         .then(cities => res.send(cities))
    //         .catch(next);
    // })

    .delete('/', (req, res, next) => {
        City.remove({})
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        const cityId = req.params.id;
        City.findByIdAndRemove(cityId)
            .then(deleted => res.send(deleted))
            .catch(next);
    })

    .post('/', jsonParser, (req, res, next) => {
        const cityData = req.body;
        new City(cityData).save()
            .then(saved => res.send(saved))
            .catch(next);
    })

    .put('/:id', jsonParser, (req, res, next) => {
        const cityId = req.params.id;
        const cityData = req.body;
        City.findByIdAndUpdate(cityId, cityData, {new: true, runValidators: true})
            .then(saved => res.send(saved))
            .catch(next);
    });

    // .put('/language/:language', jsonParser, (req, res, next) => {
    //     const cityId = req.params.id;
    //     const cityData = req.body;
    //     City.findByIdAndUpdate(cityId, cityData, {new: true, runValidators: true})
    //         .then(saved => res.send(saved))
    //         .catch(next);
    // });

module.exports = router;
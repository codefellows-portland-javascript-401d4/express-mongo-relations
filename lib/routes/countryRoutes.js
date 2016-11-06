const express = require('express');
const router = express.Router();
const bodyparser = require('../bodyparser');
const Country = require('../models/country');
const City = require('../models/city');

module.exports = router

  .get('/', (req, res, next) => {
    Country.find()
      .then(countries => res.send(countries))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    let countryId = req.params.id;
    Promise.all([
      Country.findById(countryId).lean(),

      City.find({ countryId }) // i'm creating an object with a key named countryId that has the value of the variable countryId
        .select('name continent')
        .lean()
    ])
    .then(([country, city]) => {
      country.city = city;
      res.send(country);
    })
    .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Country.findByIdAndRemove(req.params.id)
      .then(deleted => res.send(deleted))
      .catch(next);
  })

  .post('/', bodyparser, (req, res, next) => {
    new Country(req.body).save()
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:id', bodyparser, (req, res, next) => {
    Country.findByIdAndUpdate(req.params.id, req.body)
      .then(saved => res.send(saved))
      .catch(next);
  })

  .put('/:countryId/city/:cityId', bodyparser, (req, res, next) => {
    City.findById(req.params.cityId)
      .then(city => {
        city.countryId = req.params.countryId;
        return city.save();
      })
      .then(city => res.send(city))
      .catch(next);
  });

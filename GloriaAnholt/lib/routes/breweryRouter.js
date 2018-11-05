/** Created by Gloria Anholt on 11/5/16. **/

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const Beer = require('../models/beers');
const Brewery = require('../models/breweries');


router
  .get('/', (req, res, next) => {
    Brewery.find()
      .select('name address visited')
      .populate({
        path: 'beers',
        select: 'name'
      })
      .lean()
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .get('/:name', (req, res, next) => {
    Brewery.findOne({ 'name': req.params.name })
      .populate({
        path: 'beers',
        select: 'name'
      })
      .lean()
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .put('/:name', bodyParser, (req, res, next) => {
    Brewery.findOneAndUpdate(
      { 'name': req.params.name },
      req.body,
      { 'upsert': true, 'runValidators': true, 'setDefaultsOnInsert': true })
      .then(res.send(`${req.params.name} updated.`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .post('/', bodyParser, (req, res, next) => {
    const brewery = new Brewery(req.body);
    brewery.save()
      .then(res.send(`${brewery.name} added!`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  })
  .delete('/:name', (req, res, next) => {
    Brewery.remove({ 'name': req.params.name })
      .then(res.send(`${req.params.name} removed.`))
      .catch((err) => {
        console.error('you got an error: ', err);
        next(err);
      });
  });

module.exports = router;
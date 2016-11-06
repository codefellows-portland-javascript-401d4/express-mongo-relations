/** Created by Gloria Anholt on 11/4/16. **/


const mongoose = require('mongoose');
const Beer = require('./beers');
mongoose.Promise = Promise;


const brewerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  streetAddress: String,
  zipcode: Number,
  phone: Number,
  visited: {
    type: Boolean,
    required: true,
    default: false
  },
  brewery: Boolean,
  favoriteBeer: String,
  beers: [Beer.schema]      // importing a schema must use lowercase .schema
});                         // regardless of what I named it or exported.

module.exports = mongoose.model('Brewery', brewerySchema, 'Breweries');
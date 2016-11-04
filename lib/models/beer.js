/** Created by Gloria Anholt on 11/4/16. **/


const mongoose = require('mongoose');
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
  favoriteBeer: String
});

module.exports = mongoose.model('brewery', brewerySchema, 'breweries');
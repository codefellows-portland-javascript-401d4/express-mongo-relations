/** Created by Gloria Anholt on 11/4/16. **/


const mongoose = require('mongoose');
mongoose.Promise = Promise;


const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brewery: String,
  IBU: Number,
  hops: Array,
  ABV: Number,
  notes: Mixed
});

module.exports = mongoose.model('beer', beerSchema, 'beers');
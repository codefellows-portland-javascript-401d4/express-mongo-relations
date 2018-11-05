/** Created by Gloria Anholt on 11/4/16. **/


const mongoose = require('mongoose');
mongoose.Promise = Promise;


const beerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brewery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brewery'
  },
  IBU: Number,
  hops: Array,
  ABV: Number,
  notes: Array
});

module.exports = mongoose.model('Beer', beerSchema, 'Beers');
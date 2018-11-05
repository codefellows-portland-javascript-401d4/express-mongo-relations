const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  population: {
    type: Number,
    default: 0
  },

  countryId: {
    type: Schema.Types.ObjectId,
    ref: 'Country'
  }
});

module.exports = mongoose.model('City', citySchema);

//check that all routes work with postman
//make sure e2e tests still work
//work on unit tests

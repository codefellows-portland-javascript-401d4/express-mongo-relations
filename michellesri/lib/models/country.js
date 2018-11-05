const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: String,
    required: true
  },

  population: {
    type: Number,
    default: 0
  },

  continent: {
    type: String
  }
});

module.exports = mongoose.model('Country', countrySchema);

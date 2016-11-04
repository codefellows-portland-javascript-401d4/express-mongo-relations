const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
	// define "shape" of model here
  team: {
    type: String,
    required: true
  },
  league: {
    type: String,
    default: 'American'
  },
  wins: {
    type: Number,
    min: 0,
    max: 162
  }
});

module.exports = mongoose.model('Team', schema);
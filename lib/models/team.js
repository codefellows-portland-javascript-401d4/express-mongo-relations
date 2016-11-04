const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({

  team: {
    type: String,
    required: true
  },
  league: {
    type: String,
    default: 'American'
  },
  division: {
    type: String,
    default: 'West'
  },
  wins: {
    type: Number,
    min: 0,
    max: 162
  }
});

module.exports = mongoose.model('Team', schema);
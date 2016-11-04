const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  team: {
    type: String,
    default: 'Athletics'
  },
  homers: {
    type: Number,
    min: 0
  }
});

module.exports = mongoose.model('Player', schema);
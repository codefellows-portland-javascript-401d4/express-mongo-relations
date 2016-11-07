const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  artistId: {
    type: Schema.Types.ObjectId, 
    ref: 'Artist'
  },
  title: {
    type: String,
    required: [true, 'Please enter a title']
  },
  year: {
    type: Number,
    min: [1880, 'Please enter a valid year'],
    max: [2017, 'Please enter a valid year']
  }
});

module.exports = mongoose.model('Record', schema);
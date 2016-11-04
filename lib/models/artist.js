const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Artist = new Schema({

  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'visual'  
  },
  genre: {
    type: String,
    default: 'pop'
  },
  shows: {
    type: String
  }
});

module.exports = mongoose.model('Artist', Artist);

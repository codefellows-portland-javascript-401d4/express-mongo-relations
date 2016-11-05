const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Show = new Schema({

  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
  },
  type: {
    type: String,
    default: 'visual'
  },
  genre: {
    type: String,
    default: 'pop'
  }
});

module.exports = mongoose.model('Show', Show);

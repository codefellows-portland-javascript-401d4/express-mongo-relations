const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  heat: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Tag', schema);
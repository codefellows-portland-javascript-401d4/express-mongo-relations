const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  date: String
});

module.exports = mongoose.model('Reminder', schema);

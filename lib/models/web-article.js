const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  authorFirst: {
    type: String,
    required: false
  },
  authorLast: {
    type: String,
    required: false
  },
  publishDate: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  }
});

module.exports = mongoose.model('Web-article', schema);
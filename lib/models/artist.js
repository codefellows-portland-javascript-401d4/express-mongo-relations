const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Record = require('./record');

const schema = new Schema({
  name: {
    type: String
  }
});

module.exports = mongoose.model('Artist', schema);
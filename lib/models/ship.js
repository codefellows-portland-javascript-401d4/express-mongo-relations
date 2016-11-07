const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'Unknown'
  }
});

const Ship = mongoose.model('Ship', schema);

module.exports = Ship;
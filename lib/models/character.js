const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  forceUser: {
    type: Boolean,
    default: false
  },
  shipId: {
    type: Schema.Types.ObjectId,
    ref: 'Ship'
  }
});

const Character = mongoose.model('Character', schema);

module.exports = Character;
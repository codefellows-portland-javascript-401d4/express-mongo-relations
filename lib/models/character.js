const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  weapon: {
    type: String
  },
  ship: {
    type: Schema.Types.ObjectId,
    ref: 'Ship'
  }
});

const Character = mongoose.model('Character', schema);

module.exports = Character;
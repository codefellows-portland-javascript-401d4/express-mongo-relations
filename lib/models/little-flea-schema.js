const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema for 'LittleFlea'
const schema = new Schema({
  subtype: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  venom: {
    type: String,
    required: true
  },
  fleaId: {
    type: Schema.Types.ObjectId,
    ref: 'Flea'
  }
});

module.exports = mongoose.model('LittleFlea', schema);

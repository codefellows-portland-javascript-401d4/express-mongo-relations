const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', schema);
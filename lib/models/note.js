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
  tagId: {
    type: [Schema.Types.ObjectId],
    ref: 'Tag'
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', schema);
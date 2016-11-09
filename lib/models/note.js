const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    default: ''
  },

  reminderId: {
    type: Schema.Types.ObjectId,
    ref: 'Reminder'
  },

  done: {
    type: Boolean,
    default: false
  }
});

schema.statics.findUnfinished = function() {
  return this.find({'done': false});
};

module.exports = mongoose.model('Note', schema);

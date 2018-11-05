const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  homers: {
    type: Number,
    min: 0
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: 'Team'   
  }

});

module.exports = mongoose.model('Player', schema);
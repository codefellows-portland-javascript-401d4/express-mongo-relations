const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Team = require('./team');

const schema = new Schema ({
    coachName: {
        type: String,
        required: true
    },
    position: {
        type: String,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }

});

module.exports = mongoose.model('Coach', schema);
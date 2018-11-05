const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPlayer = new Schema ({

    playerName: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }

});

module.exports = mongoose.model('Player', schemaPlayer);

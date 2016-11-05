const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTeam = new Schema ({

    teamName: {
        type: String,
        required: true
    },
    wins: {
        type: Number
    },
    losses: {
        type: Number
    },
    rosterId: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
    }]

});


module.exports = mongoose.model('Team', schemaTeam);

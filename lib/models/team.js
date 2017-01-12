const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTeam = new Schema ({
    
    teamName: {
        type: String,
        required: true
    },
    conference: {
        type: String,

    },
    wins: {
        type: Number
    },
    coachId: [{
        type: Schema.Types.ObjectId,
        ref: 'Coach'
    }]    

});

module.exports = mongoose.model('Team', schemaTeam);
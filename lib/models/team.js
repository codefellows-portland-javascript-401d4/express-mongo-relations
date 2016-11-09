const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaTeam = new Schema ({
    
    name: {
        type: String,
        required: true
    },
    conference: {
        type: String,

    },
    wins: {
        type: Number
    }    

});

module.exports = mongoose.model('Team', schemaTeam);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actor = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    academyAward: {
        type: Boolean,
        default: false
    },
    movieId: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie'
    }]
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Actor', actor);
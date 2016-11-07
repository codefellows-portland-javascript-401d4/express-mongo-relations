const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movie = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: 'drama'
    },
    leadActor: {
        type: String
    },
    academyAward: {
        type: Boolean,
        default: false
    },
    actorId: {
        type: Schema.Types.ObjectId,
        ref: 'Actor'
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Movie', movie);
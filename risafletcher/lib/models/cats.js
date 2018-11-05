const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Herds = require('./herds');

const schema = new Schema({
    name: {
        type: String,
        default: 'Tom',
        required: true
    },
    herdId: {
        type: Schema.Types.ObjectId,
        ref: 'Herds'
    },
    color: {
        type: String,
        required: true
    },
    legs: {
        type: Number,
        max: [4],
        required: true
    }
});

module.exports = mongoose.model('Cats', schema);
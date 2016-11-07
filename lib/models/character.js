'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: String,
    race: String,
    gameId: {
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }
});

module.exports = mongoose.model('Character', schema);
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movement = require('./movement');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },

    birthdate: {
        type: String
    },

    movementId: {
        type: Schema.Types.ObjectId,
        ref: 'Movement'
    }
});

module.exports = mongoose.model('Artist', schema);

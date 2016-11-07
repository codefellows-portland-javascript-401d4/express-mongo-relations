'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movement = require('./movement');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    year: {
        type: Number
    },

    movementId: {
        type: Schema.Types.ObjectId,
        ref: 'Movement'
    }
});

module.exports = mongoose.model('Painting', schema);

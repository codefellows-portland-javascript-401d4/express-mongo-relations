'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        default: 'Modernist',
        required: true
    },

    began: {
        type: Number
    },

    ended: {
        type: Number
    }
});

module.exports = mongoose.model('Movement', schema);

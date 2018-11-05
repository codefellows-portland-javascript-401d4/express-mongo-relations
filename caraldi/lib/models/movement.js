'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },

    start: {
        type: Number
    },

    end: {
        type: Number
    }
});

module.exports = mongoose.model('Movement', schema);

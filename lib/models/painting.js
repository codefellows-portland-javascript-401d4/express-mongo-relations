'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },

    year: {
        type: Number
    }
});

module.exports = mongoose.model('Painting', schema);

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    developer: String,
    released: String,
    platform: Array
});

module.exports = mongoose.model('Game', schema);
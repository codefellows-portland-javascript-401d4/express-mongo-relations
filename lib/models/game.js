'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: string,
        required: true
    },
    developer: String,
    released: String,
    platform: Array,
    sequels: boolean
});

module.exports = mongoose.model('Game', schema);
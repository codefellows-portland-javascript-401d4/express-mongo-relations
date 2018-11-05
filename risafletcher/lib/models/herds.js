const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        default: 'Cat Mob',
        required: true
    },
    breed: {
        type: String, 
        required: true
    },
    size: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Herds', schema);
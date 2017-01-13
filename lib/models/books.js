const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const book = new Schema({
    title: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        default: 'Science Fiction',
        required: true
    },
    author: {
        type: String,
        required: true
    },
    nbrBooks: {
        type: Number,
        default: 1,
        min: 1,
        required: true
    }

});

module.exports = mongoose.model('Book', book);
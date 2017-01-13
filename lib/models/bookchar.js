const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'Human',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    nbrBooks: {
        type: Number,
        default: 1,
        min: 1,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        ref:  'Book'
    }

});

module.exports = mongoose.model('Character', schema);
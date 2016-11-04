const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    showname: {
        type: String,
        required: true
    },
    airdate: {
        type: Date
    },
    genre: {
        type: String
    },
    characters: []
});

module.exports = mongoose.model('AnimeShows', schema);
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
    characters: [{ type: Schema.Types.ObjectId, ref: 'AnimeChars'}]
});

module.exports = mongoose.model('AnimeShows', schema);
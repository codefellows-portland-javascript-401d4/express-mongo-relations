const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    script: {
        type: String,
        required: true
    },
    cities: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    }
});

module.exports = mongoose.model('Language', languageSchema);
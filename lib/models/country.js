const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provinces: Number
});

module.exports = mongoose.model('Country', countrySchema);
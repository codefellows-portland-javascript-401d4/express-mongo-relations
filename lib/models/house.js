const mongoose = require('mongoose');
const  Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    address: String,
    bedrooms: Number
});

module.exports = mongoose.model('House', schema);


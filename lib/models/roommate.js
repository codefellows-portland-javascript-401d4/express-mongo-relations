
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, required: true},
    gender: String,
    houseId: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});


//add some methods here??

module.exports = mongoose.model('Roommate', schema);
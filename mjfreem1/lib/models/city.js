const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Language = require('./language');

const citySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    population: Number,
    countryId: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    }
    // languages: [Language.schema]
});

citySchema.statics.findByLanguage = function(language) {
    return this.find({'language.name': language});
};

module.exports = mongoose.model('City', citySchema);
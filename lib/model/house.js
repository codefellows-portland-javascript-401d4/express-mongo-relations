const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
		required: true,
		// unique: true
	},
	sigil: {
		type: String,
		required: true
	},
	words: {
		type: String,
		required: true
	},
	seat: {
		type: String,
		required: true
	},

	members: {
		type: [String]
	}
});

module.exports = mongoose.model('House', schema);
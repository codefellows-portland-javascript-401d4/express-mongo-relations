const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const schemaUser = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [ String ]
});

// User sign up - hash is generated from the password supplied by new user
schemaUser.methods.generateHash = function(password) {
    return this.password = bcrypt.hashSync(password, 8);
};

// User sign in - the user's supplied password is compared to the stored hash
schemaUser.methods.compareHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schemaUser);

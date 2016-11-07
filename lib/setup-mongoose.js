const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/';

//TODO check Marty's updated code and docs for db URI with two resources I'm not sure how this affects that

mongoose.Promise = Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected.');

});


process.on('SIGINt', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termingation');
        process.exit(0);
    });
    
});

module.exports = mongoose.connection;
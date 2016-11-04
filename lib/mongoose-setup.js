const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://Waxhoya:223codefellows@ds143717.mlab.com:43717/anime';

mongoose.Promise;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose is connected to: ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', function() {
    console.log('*** Mongoose connection disconnected ***');
});

// If node closes thn close the Mongoose Connection to MLab.com

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('App termination signal recieved, Stopping Mongo DB connection.');
        process.exit(0);
    });
});
module.exports = mongoose.connection;

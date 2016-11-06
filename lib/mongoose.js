'use strict';

const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/';
mongoose.connect(dbURI);


mongoose.connection.on('success', function(dbURI) {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnect', function() {
    console.log('Mongoose default connection disconnected');
});

process.on('app termination', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected via app termination');
        process.exit(0);
    });
});

module.exports = mongoose.connection;

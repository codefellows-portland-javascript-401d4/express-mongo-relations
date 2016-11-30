const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/pirates';

mongoose.Promise = Promise;
mongoose.connect(dbURI);
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Mongoose default connection open to ${dbURI}.`);
});

db.on('error', err => {
    console.log(`Mongoose default connection error: ${err}.`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connectio disconnected.');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Mongoose default connection disconnected through app termination.');
        process.exit(0);
    });
});

module.exports = db;
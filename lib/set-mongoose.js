const mongoose = require('mongoose');

//URI that points to db
mongoose.Promise = Promise;
const dbURI = process.env.MONGODB_URI || 'mongodb:/localhost/exmorel-db';

mongoose.connect(dbURI);

//when connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to ' + dbURI);
});

//if connection errors
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

//when connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

//when Node process ends, close Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through Node termination');
    process.exit(0);
  });
});

module.exports = mongoose.connection;


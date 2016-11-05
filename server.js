const http = require('http');

const app = require('./lib/app');

const server = http.createServer(app);

module.exports = server;
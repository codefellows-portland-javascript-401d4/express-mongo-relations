'use strict';

const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 8080;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Server listening on port', server.address().port);
});

module.exports = server;
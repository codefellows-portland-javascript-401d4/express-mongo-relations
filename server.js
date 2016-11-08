const app = require('./lib/app');
const port = process.env.PORT || 3000;
const http = require('http');
require('./lib/mongoose-setup');

const server = http.createServer(app);
server.listen(port, () => {
    console.log('The server is running on: ', port);
});

const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3000;
require('./lib/setup-mongoose');

const server = http.createServer(app);

server.listen(port, err => {
    if (err) console.log(`Error: ${err}`);
    else console.log(`Server listening on port ${port}`);
});
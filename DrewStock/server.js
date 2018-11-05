const http = require('http');
const app = require('./lib/app');
const port = process.env.PORT;

require('./lib/setup_mongoose');

const server = http.createServer(app);

server.listen(port, err => {
    if(err) console.log('server error!', err);
    else console.log('app running on port', port);
});

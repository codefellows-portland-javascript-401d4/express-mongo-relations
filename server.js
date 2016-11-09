const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8080;
require('./lib/setup-mongoose.js');

const server = http.createServer(app);

server.listen(port, err => {
    if(err) console.log('ERROR!', err);
    else console.log('app running on port', server.address().port);
});
const http = require('http');

const app = require('./lib/app');
require('./lib/set-mongoose');

const server = http.createServer(app);
const port = process.env.PORT || 3535;

server.listen(port, err => {
  if (err) console.log('ERROR!', err);
  else console.log('http server listening on port', port);
});
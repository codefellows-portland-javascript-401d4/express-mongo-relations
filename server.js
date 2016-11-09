const http = require('http');
const app = require('./lib/app');
const port = 3000;
require('./lib/mongoose-setup');

const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listening on port', server.address().port);
});

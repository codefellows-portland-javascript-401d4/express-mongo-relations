require('./lib/setup-mongoose');
const app = require('./lib/app');
const port = process.env.PORT || 3000;
const http = require('http');
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listening on port :', port);
});
const app = require('./lib/app');

const port = process.env.PORT || 3000;
require('./lib/setup-mongoose');

app.listen(port, () => {
  console.log('app running on port: ', port);
});

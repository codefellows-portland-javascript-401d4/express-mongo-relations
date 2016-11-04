Express-Mongo-Resources assignment for Code Fellows 401

by Greg Katchmar

1.0.0  2016-11-03

Uses two soon-to-be-related models (player and teams) to crudely replicate a statistical baseball site including sorting of statistics, team records, etc.

"Node server.js" to launch program.

In addition to having a MongoDB server running (type 'mongod' in a dedicated terminal window), you will need the following npm installs:

"dependencies": {
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "mongoose": "^4.6.5",
    "morgan": "^1.7.0"
  },
   "devDependencies": {
    "chai": "^3.5.0",
    "chai-http": "^3.0.0",
    "eslint": "^3.9.1",
    "mocha": "^3.1.2"
  }

"npm run test" to launch the test package which tests the two models and the api.

This project is licensed under the ISC License - see the LICENSE.md file for details
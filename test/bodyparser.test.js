const chai = require('chai');
const assert = chai.assert;
const bodyparser = require('../lib/bodyparser');
const EventEmitter = require('events');

describe('bodyparser test', () => {
  it('parses the body', done => {
    const bodyObj = { name: 'parserName', type: 'parserType'};
    const req = new EventEmitter();

    const next = () => {
      assert.deepEqual(req.body, bodyObj);
      done();
    };
    bodyparser(req, null, next);

    req.emit('data', JSON.stringify(bodyObj));
    req.emit('end');
  });
});

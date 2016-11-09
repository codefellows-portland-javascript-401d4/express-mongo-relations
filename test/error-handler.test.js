const assert = require('chai').assert;
const errorHandler = require('../lib/error-handler');

describe('error handler', () => {
  const err = {};
  const req = {};
  const res = {};
  const next = {};

  res.send = function(obj) {
    this.message = obj.message;
  };

  res.status = function(obj) {
    this.code = obj.code;
    return this;
  };

  it('handles generic error', done => {
    errorHandler(err, req, res, next);
    assert.equal(err.code, 500);
    assert.equal(err.message, 'Internal server ERROR!');
    done();
  });

  it('handles CastError', done => {
    err.name = 'CastError';
    errorHandler(err, req, res, next);
    assert.equal(err.code, 404);
    assert.equal(err.message, 'Bad request path, resource does not exist');
    done();
  });

  it('handles SyntaxError', done => {
    err.name = 'SyntaxError';
    errorHandler(err, req, res, next);
    assert.equal(err.code, 400);
    assert.equal(err.message, 'Invalid data input');
    done();
  });

  it('handles CastError', done => {
    err.name = 'ValidationError';
    errorHandler(err, req, res, next);
    assert.equal(err.code, 400);
    assert.equal(err.message, 'Invalid data input');
    done();
  });
});

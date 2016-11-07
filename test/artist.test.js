const Artist = require('../lib/models/artist');
const assert = require('chai').assert;

describe('Artist model', () => {

  it('validates with name', done => {
    const artist = new Artist({
      name: 'Rocky Balboa'
    });

    artist.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const artist = new Artist({
    });

    artist.validate(err => {
      assert.isOk(err, 'you must enter a name');
      done();
    });
  });

});
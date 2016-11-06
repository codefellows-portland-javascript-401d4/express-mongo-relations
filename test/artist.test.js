const Artist = require('../lib/models/artist');
const assert = require('chai').assert;

describe('Artist model', () => {

  it('validates with name and genre', done => {
    const artist = new Artist({
	    name: 'name',
      genre: 'genre'
    });

    artist.validate(err => {
	    if (!err) done();
      else done(err);
		  });
  });

  it('name is required', done => {
    const artist = new Artist();
    artist.genre = 'water color';

    artist.validate(err => {
	    assert.isOk(err, 'name should have been required');
	    done();
	  });
  });

  it('shows must be a number', done => {

	  const artist = new Artist({
		  name: 'artist',
		  shows: 'not a number'
  });
			
    artist.validate(err => {
		  assert.isOk(err, 'expected error on shows data type');
		  done();
	  });
  });

  it('genre defaults to "pop"', done => {
	  const artist = new Artist({
		  name: 'Quire'
  });

	  artist.validate(err => {
		  assert.isNotOk(err);
		  assert.equal(artist.genre, 'pop');
		  done();
	  });
  });

});

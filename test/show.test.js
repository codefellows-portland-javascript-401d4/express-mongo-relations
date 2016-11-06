const Show = require('../lib/models/show');
const assert = require('chai').assert;

describe('Show model', () => {

  it('validates with name and genre', done => {
    let show = new Show({
	    name: 'name',
      genre: 'genre'
    });

    show.validate(err => {
	    if (!err) done();
      else done(err);
		  });
  });

  it('name is required', done => {
    let show = new Show();
    show.genre = 'installation';

    show.validate(err => {
	    assert.isOk(err, 'name should have been required');
	    done();
	  });
  });

  it('type defaults to "visual"', done => {
	  let show = new Show({
		  name: 'recycyled-rainwater'
  });

	  show.validate(err => {
		  assert.isNotOk(err);
		  assert.equal(show.type, 'visual');
		  done();
	  });
  });

});

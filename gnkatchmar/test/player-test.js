const Player = require('../lib/models/player');
const assert = require('chai').assert;

describe('Player model', () => {

  it('validates with name and position', done => {
    const player = new Player({
      name: 'name',
      position: 'position'
    });

    player.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const player = new Player();
    player.position = 'OF';

    player.validate(err => {
      assert.isOk(err, 'name should have been required');
      done();
    });
  });

  it('homers must be a number', done => {
    const player = new Player({
      name: 'player',
      homers: 'not a number'
    });
			
    player.validate(err => {
      assert.isOk(err, 'expected error on homers data type');
      done();
    });
  });

  it('homers must be a positive number', done => {
    const player = new Player({
      name: 'player',
      homers: -10
    });
			
    player.validate(err => {
      assert.isOk(err, 'expected error on homers data type');
      done();
    });
  });
 
});

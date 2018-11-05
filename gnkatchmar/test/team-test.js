const Team = require('../lib/models/team');
const assert = require('chai').assert;

describe('Team model', () => {

  it('validates with team and league', done => {
    const team = new Team({
      team: 'team',
      league: 'league'
    });

    team.validate(err => {
      if (!err) done();
      else done(err);
    });
  });

  it('team is required', done => {
    const team = new Team();
    team.league = 'American';

    team.validate(err => {
      assert.isOk(err, 'name should have been required');
      done();
    });
  });

  it('wins must be a number', done => {
    const team = new Team({
      team: 'team',
      wins: 'not a number'
    });
			
    team.validate(err => {
      assert.isOk(err, 'expected error on wins data type');
      done();
    });
  });

	 it('wins must be less than 163', done => {
   const team = new Team({
     team: 'team',
     wins: 1000
   });
			
   team.validate(err => {
     assert.isOk(err, 'expected error on wins data type');
     done();
   });
 });
	

  it('league defaults to "American"', done => {
    const team = new Team({
      team: 'Athletics'
    });

    team.validate(err => {
      assert.isNotOk(err);
      assert.equal(team.league, 'American');
      done();
    });
  });

});

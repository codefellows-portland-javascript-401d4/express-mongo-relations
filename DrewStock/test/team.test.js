const Team = require('../lib/models/team');
const assert = require('chai').assert;

describe('Team model', () => {

    it('validates with teamName', done => {
        const team = new Team ({
            teamName: 'teamName'
        });

        team.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('teamName is required', done => {
        const team = new Team ();
        team.wins = 2;

        team.validate(err => {
            assert.isOk(err, 'teamName should have been required');
            done();
        });
    });

    it('wins must be a number', done => {
        const team = new Team( {
            teamName: 'team',
            wins: "two"
        });

        team.validate(err => {
            // console.log(err.errors);
            assert.isOk(err, 'expected error - incorrect data type on wins');
            done();
        });
    });



});

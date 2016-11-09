const Team = require('../lib/models/team');
const assert = require('chai').assert;

describe('Team model', () => {
    it('validate team name', done => {
        const team = new Team ({
            name: 'name'
        });

        team.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    if('teamName is required', done => {
        const team = new Team ();
        team.wins = 5;

        team.validate(err => {
            assert.isOk(err, 'teamName should be required');
            done();
        });        
    });

    it('wins have to be a number', done => {
        const team = new Team();
        team.wins = null;

        team.validate(err => {
            assert.isOk(err, 'expected error: data type should be number');
            done();
        });
    });
});
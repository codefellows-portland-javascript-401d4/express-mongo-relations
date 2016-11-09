const Coach = require('../lib/models/coach');
const assert = require('chai').assert;

describe('Coach model', () => {
    it('validate coach name', done => {
        const coach = new Coach ({
            coachName: 'coachName'
        });

        coach.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    if('coachName is required', done => {
        const coach = new Coach ();
        coach.position = 'Head';

        coach.validate(err => {
            assert.isOk(err, 'coachName should be required');
            done();
        });        
    });

    it('position must be a string', done => {
        const coach = new Coach(); 
        coach.position = null;
            // coachName: 'coach',
            // position: 'head'
        
        coach.validate(err => {
            assert.isOk(err, 'expected error: data type should be string');
            done();
        });
    });
});
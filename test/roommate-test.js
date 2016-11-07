const Roommate = require('../lib/models/roommate');
const assert = require('chai').assert;

describe ('Roommate model', () => {
    it('validates with name and gender', done => {
        const roommate = new Roommate({
            name: 'Jay',
            gender: 'M'
        });

        roommate.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('requires a name', done => {                    const roommate = new Roommate({
        gender: 'M'});

        roommate.validate(err => {
            assert.isOk(err, 'should err without a name');
            done();
        });
    });

    it('gender must be a string', done => {
        const roommate = new Roommate({
            name: 'Nic',
            gender: {}
        });

        roommate.validate(err => {
            assert.isOk(err, 'gender should be a string');
            done();
        });
    });
});
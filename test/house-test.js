const House = require('../lib/models/house');
const assert = require('chai').assert;

describe('House model', () => {

    it('validates with name, address and bedrooms', done => {
        const house = new House({
            name: 'Science Camp', 
            address: 'FOPO', 
            bedrooms: 5
        });

        house.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('requires a name', done => {
        const house = new House({
            address: 'Hollywood'
        });

        house.validate(err => {
            assert.isOk(err, 'should require a name');
            done();
        });
    });

    it('requires name to be a string', done => {
        const house = new House ({
            name: [],
            address: 'Buckman', 
            bedrooms: 3
        });

        house.validate( err => {
            assert.isOk(err, 'name should not be an object');
            done();
        });
    });

    it('requires bedrooms to be a number', done => {
        const house = new House ({
            name: 'Adult House', 
            bedrooms: []
        });

        house.validate(err => {
            assert.isOk(err, 'bedrooms should be a number');

            done();
        });
    });
});
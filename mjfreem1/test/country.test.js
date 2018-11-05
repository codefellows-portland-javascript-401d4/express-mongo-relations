const Country = require('../lib/models/city');
const assert = require('chai').assert;

describe('Country model', () => {

    it('validates with name and provinces', done => {
        const country = new Country({
            name: 'Blahblahkia',
            religions: ['Mammon'],
            freedom: true
        });

        country.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const country = new Country({
            provinces: 4
        });

        country.validate(err => {
            assert.isOk(err, 'name not present');
            done();
        });
    });

    it('requires provinces to be a number', done => {
        const country = new Country({
            name: 'WooHoo',
            population: 'five'
        });

        country.validate(err => {
            assert.isOk(err, 'population is not number');
            done();
        });
    });
});
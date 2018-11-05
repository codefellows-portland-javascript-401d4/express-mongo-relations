const City = require('../lib/models/city');
const Country = require('../lib/models/country');
const assert = require('chai').assert;

describe('City model', () => {

    it('validates with name, population, and countryId', done => {
        const country = new Country({
            name: 'Blatstonia',
            provinces: 7
        });
        const city = new City({
            name: 'Tootsville',
            population: 1,
            countryId: country._id
        });

        city.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const city = new City({
            region: 'Dedede',
            population: 2
        });

        city.validate(err => {
            assert.isOk(err, 'name not present');
            done();
        });
    });

    it('requires population to be a number', done => {
        const city = new City({
            name: 'Hebetude',
            population: 'five'
        });

        city.validate(err => {
            assert.isOk(err, 'population is not a number');
            done();
        });
    });
});
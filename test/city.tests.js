const City = require('../lib/models/city');
const Country = require('../lib/models/country');
const assert = require('chai').assert;

describe('city model', () => {

  it('validates with a name, population, and countryId', done => {
    const city = new City();
    city.name = 'Cupertino';
    city.population = 1000;

    const country = new Country();
    country.name = 'Iceland',
    country.population = 10;

    city.countryId = country._id;

    city.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('checks value types correctly', done => {
    const city = new City();
    city.name = 'Cupertino';
    city.population = 'blah';

    city.validate(err => {
      assert.isOk(err);
      done();
    });
  });

  it('name is required', done => {
    const city = new City();
    city.population = 10;

    city.validate(err => {
      assert.isOk(err, 'name should be required');
      done();
    });
  });

  it('population must be a number', done => {
    const city = new City();
    city.name = 'Cupertino';
    city.population = 'not a number';
    city.validate(err => { //validate is a mongoose thing that checks the schema rules
      assert.isOk(err, 'expected error on city data type');
      done();
    });
  });
});

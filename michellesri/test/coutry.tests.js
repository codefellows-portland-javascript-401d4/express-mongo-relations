const Country = require('../lib/models/country');
const assert = require('chai').assert;

describe('country model', () => {

  it('validates with a name and a population', done => {
    const country = new Country();
    country.name = 'Canada';
    country.population = 1000;

    country.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('name is required', done => {
    const country = new Country();
    country.population = 10;

    country.validate(err => {
      assert.isOk(err, 'name should be required');
      done();
    });
  });

  it('population must be a number', done => {
    const country = new Country();
    country.name = 'Canada';
    country.population = 'not a number';
    country.validate(err => { //validate is a mongoose thing that checks the schema rules
      assert.isOk(err, 'expected error on country data type');
      done();
    });
  });
});

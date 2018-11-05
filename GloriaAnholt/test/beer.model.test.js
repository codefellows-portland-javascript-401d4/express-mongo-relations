/** Created by Gloria Anholt on 11/6/16. **/

const assert = require('chai').assert;
const Brewery = require('../lib/models/breweries');


describe('Brewery model', () => {

  it('validates that name and visited are set', done => {

    const brewery = new Brewery({
      name: "Test Brewery",
      visited: true
    });

    brewery.validate(err => {
      if (!err) done();
      else done(err);
    });

  });


  it('ensures that a name is required', done => {

    const noname = new Brewery({
      visited: true,
      address: '1234 Main St'
    });

    noname.validate(err => {
      if (err) done();
      else done('an error should have happened');
    });

  });

  it('ensures zip is a either a number or a string of only numbers', done => {

    const weirdname = new Brewery({
      name: 'weirdname',
      zipcode: 'Not a zipcode',
      visited: false
    });

    weirdname.validate(err => {
      if (err) done();
      else done('Numerical names shouldnt be a thing');
    });

  });

  it('defaults visited to false', done => {

    const falsybrewery = new Brewery({
      name: 'Never Visited',
      phone: 5038675309
    });

    falsybrewery.validate(err => {
      if (err) return done(err);
      assert.equal(falsybrewery.visited, false);
      done();
    });

  });

});
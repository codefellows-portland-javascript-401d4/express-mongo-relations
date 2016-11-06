/** Created by Gloria Anholt on 11/3/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose' );
const app = require('../lib/app');

describe('the routes and models of breweries', () => {

  const server = chai.request(app);

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) setupBrewery();
    else connection.on('open', setupBrewery);

    function setupBrewery() {
      const name = 'Breweries';
      connection.db
        .listCollections({name})
        .next((err, collInfo) => {
          if (!collInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  it('posts new breweries to the list', done => {

    const Belmont = {
      "name": "Belmont Station",
      "streetAddress": "4500 SE Stark St",
      "zipcode": 97215,
      "phone": 5032328538,
      "brewery": false,
      "favoriteBeer": null,
      "visited": true
    };
    const Lompoc = {
      "name": "Lompoc 5th Quadrant",
      "streetAddress": "3901 N Williams Ave",
      "zipcode": 97227,
      "phone": 5032883996,
      "brewery": true,
      "favoriteBeer": "Proletariat Red",
      "visited": true
    };
    const Laurelwood = {
      "name": "Laurelwood Public House & Brewery",
      "streetAddress": "5115 NE Sandy Blvd",
      "zipcode": 97213,
      "phone": 5032820622,
      "brewery": true,
      "favoriteBeer": "Workhorse IPA",
      "visited": true
    };

    const Deschutes = {
      "name": "Deschutes",
      "phone": 5038675309,
      "brewery": true,
      "visited": true
    };

    server
      .post('/api/brewery')
      .send(Belmont)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Belmont Station added!');
      });

    server
      .post('/api/brewery')
      .send(Lompoc)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Lompoc 5th Quadrant added!');
      });

    server
      .post('/api/brewery')
      .send(Laurelwood)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Laurelwood Public House & Brewery added!');
      });

    server
      .post('/api/brewery')
      .send(Deschutes)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes added!');
        done();
      });
  });

  it('queries by a brewery name and gets results', done => {

    const expectedResults = {
      "name": "Belmont Station",
      "streetAddress": "4500 SE Stark St",
      "zipcode": 97215,
      "phone": 5032328538,
      "brewery": false,
      "favoriteBeer": null,
      "visited": true
    };

    server
      .get('/api/brewery/Belmont%20Station') // there's a space in the name
      .end((err, res) => {
        if (err) return done(err);
        let results = JSON.parse(res.text);
        assert.equal(results.name, expectedResults.name);
        assert.equal(results.streetAddress, expectedResults.streetAddress);
        assert.equal(results.zipcode, expectedResults.zipcode);
        assert.equal(results.phone, expectedResults.phone);
        assert.equal(results.brewery, expectedResults.brewery);
        assert.equal(results.favoriteBeer, expectedResults.favoriteBeer);
        assert.equal(results.visited, expectedResults.visited);
        done();
      });
  });

  it('updates a valid field in an existing record', done => {

    const update = {"favoriteBeer":"Mirror Pond"};

    server
      .put('/api/brewery/Deschutes')
      .send(update)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes updated.');
      });

    server
      .get('/api/brewery/Deschutes')
      .end((err, res) => {
        if (err) return done(err);
        let results = JSON.parse(res.text);
        assert.equal(results.favoriteBeer, update.favoriteBeer);
        done();
      });
  });

  it('deletes a record by name', done => {

    server
      .del('/api/brewery/Deschutes')
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Deschutes removed.');
      });

    server
      .get('/api/brewery/Deschutes')
      .end((err, res) => {
        if (err) done();
        else done(err);
      });
  });


  after(done => {

    const name = 'Breweries';
    connection.db
      .listCollections({name})
      .next((err, collInfo) => {
        if (!collInfo) return done();
        connection.db.dropCollection(name, done);
      });
  });

});


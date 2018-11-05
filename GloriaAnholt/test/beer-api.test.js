/** Created by Gloria Anholt on 11/6/16. **/

const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose' );
const app = require('../lib/app');

describe('the routes and models of beers api', () => {

  const server = chai.request(app);

  before(done => {

    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) setupBeer();
    else connection.on('open', setupBeer);

    function setupBeer() {
      const name = 'Beers';
      connection.db
        .listCollections({name})
        .next((err, collInfo) => {
          if (!collInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }

  });

  it('posts new beers to the list', done => {

    const Workhorse = {
      "name": "Workhorse IPA",
      "IBU": 55,
      "hops": [ "Cascade", "Centennial", "Mosaic" ],
      "ABV": 5.4,
      "notes": ["Good malty body, not too bitter, strong finish. Very drinkable."]
    };

    server
      .post('/api/beer')
      .send(Workhorse)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.text, 'Workhorse IPA added!');
        done();
      });
  });

  it('queries a beer by name and gets results', done => {

    const expectedResults = {
      "name": "Workhorse IPA",
      "IBU": 55,
      "hops": [ "Cascade", "Centennial", "Mosaic" ],
      "ABV": 5.4,
      "notes": ["Good malty body, not too bitter, strong finish. Very drinkable."]
    };

    server
      .get('/api/beer/Workhorse%20IPA') // there's a space in the name
      .end((err, res) => {
        if (err) return done(err);
        let results = JSON.parse(res.text);
        assert.equal(results.name, expectedResults.name);
        assert.equal(results.IBU, expectedResults.IBU);
        assert.deepEqual(results.hops, expectedResults.hops);
        assert.equal(results.ABV, expectedResults.ABV);
        assert.deepEqual(results.notes, expectedResults.notes);
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

    const name = 'Beers';
    connection.db
      .listCollections({name})
      .next((err, collInfo) => {
        if (!collInfo) return done();
        connection.db.dropCollection(name, done);
      });
  });

});

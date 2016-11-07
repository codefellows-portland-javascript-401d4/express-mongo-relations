const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('artist api', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'artists';
      connection.db
        .listCollections({name})
        .next((err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const willie = {
    name: 'Willie Nelson'
  };

  it('/GET all', done => {
    request
      .get('/api/artists')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      });
  });

  it('/POST a new artist', done => {
    request
      .post('/api/artists')
      .send(willie)
      .then(res => {
        const artist = res.body;
        assert.ok(artist._id);
        willie.__v = 0;
        willie._id = artist._id;
        done();
      })
      .catch(done);
  });

  it('/GET a artist by id', done => {
    request
      .get(`/api/artists/${willie._id}`)
      .then(res => {
        const artist = res.body;
        assert.deepEqual(artist, willie);
        done();
      })
      .catch(done);
  });

  it('/GET all after post', done => {
    request
      .get('/api/artists')
      .then(res => {
        assert.deepEqual(res.body, [willie]);
        done();
      })
      .catch(done);
  });

  it('/DELETE an artist', done => {
    request
      .del(`/api/artists/${willie._id}`)
      .then( (deleted) => {
        assert.deepEqual(deleted.body.name, willie.name);
        done();
      })
      .catch(done);
  });
});
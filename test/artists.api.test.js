const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('Artists:', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'artists';
      connection.db
        .listCollections({ name })
        .next( (err, collinfo) => {
          if (!collinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const recycledRainwater = {
    name: 'recycled-rainwater',
    location: '123-front-st',
    genre: 'mixed-media',
    type: 'visual'
  };

  const quire = {
    name: 'quire',
    type: 'visual',
    genre: 'mixed-media',
    showId: recycledRainwater._id,
    shows: 105
  };


  it('GETs all', done => {
    request
      .get('/api/artists')
      .then( res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('POSTs a new artist referencing an existing show', done => {

    request
      .post('/api/artists/')
      .send(quire)
      .then(res => {
        const artist = res.body;
        assert.ok(artist._id);
        quire.__v = 0;
        quire._id = artist._id;
        done();
      })
      .catch(done);
  });

  it('GETs by id', done => {
    request
      .get(`/api/artists/${quire._id}`)
      .then(res => {
        let expected = { _id: quire._id, name: 'quire', __v: 0, shows: 105, genre: 'mixed-media', type: 'visual' };
        const artist = res.body;
        assert.deepEqual(artist, expected);
        done();
      })
      .catch(done);
  });

  it('GETs all after post', done => {
    request
      .get('/api/artists')
      .then(res => {
        let expected = [ { _id: quire._id, name: 'quire', genre: 'mixed-media',type: 'visual' } ];
        assert.deepEqual(res.body, expected);
        done();
      })
      .catch(done);
  });

  it('POSTs default genre of pop', done => {
    request
      .post('/api/artists')
      .send({ name: 'tim combs', shows: 92 })
      .then(res => {
        let genre = 'pop';
        assert.ok(res.body._id);
        assert.equal(genre, res.body.genre);
        done();
      })
      .catch(done);
  });

  it('GETs average on artists/averageShow', done => {
    let average = {"average": 98.5};
    request
      .get('/api/artists/averageShows')
      .then(res => {
        assert.deepEqual(res.body, average);
        done();
      })
      .catch(done);
  });

  it('GETs where genre is mixed media', done => {
    request
      .get('/api/artists')
      .query({genre: 'mixed-media'})
      .then(res => {
        let expected = [ { _id: quire._id, name: 'quire', genre: 'mixed-media',type: 'visual' } ];
        assert.deepEqual(res.body, expected);
        done();
      })
      .catch(done);
  });

  it('DELETEs an artist', done => {
    request
      .delete(`/api/artists/${quire._id}`)
      .then(res => {
        let expected = { _id: quire._id, name: 'quire', __v: 0, shows: 105, genre: 'mixed-media', type: 'visual' };
        assert.deepEqual(res.body, expected);
        done();
      })
      .catch(done);
  });

});

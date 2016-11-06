const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');

const app = require('../lib/app');

describe('Shows:', () => {

  before(done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'shows';
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

  it('GETs all', done => {
    request
      .get('/api/shows')
      .then( res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('POSTs a new show', done => {
    request
      .post('/api/shows')
      .send(recycledRainwater)
      .then(res => {
        const show = res.body;
        assert.ok(show._id);
        recycledRainwater.__v = 0;
        recycledRainwater._id = show._id;
        done();
      })
      .catch(done);

  });

  it('GETs show by id with list of artists', done => {

    const quire = {
      name: 'quire',
      type: 'visual',
      genre: 'mixed-media',
      showId: recycledRainwater._id,
      shows: 105
    };

    request
      .post('/api/artists')
      .send(quire)
      .then(res => {
        const artist = res.body;
        assert.ok(artist._id);
        quire.__v = 0;
        quire._id = artist._id;
      })
      .then(() => {
        request
          .get(`/api/shows/${recycledRainwater._id}`)
            .then(res => {
              let expected = {_id: recycledRainwater._id, name: 'recycled-rainwater',location: '123-front-st', genre: 'mixed-media', type: 'visual', artists: [{"_id": quire._id, "genre": "mixed-media", "name": "quire"}] };
              const show = res.body;
              assert.deepEqual(show, expected);
              done();
            })
            .catch(done);
      })
      .catch(done);
  });

  it('GETs all after post', done => {
    request
      .get('/api/shows')
      .then(res => {
        assert.deepEqual(res.body, [recycledRainwater]);
        done();
      })
      .catch(done);
  });

  it('POSTs default type of visual', done => {
    request
      .post('/api/shows')
      .send({name: 'big-500', location: 'Pioneer Square Mall'})
      .then(res => {
        let type = 'visual';
        assert.ok(res.body._id);
        assert.equal(type, res.body.type);
        done();
      })
      .catch(done);
  });

  it('GETs where location is 123-front-st', done => {
    request
      .get('/api/shows')
      .query({location: '123-front-st'})
      .then(res => {
        assert.deepEqual(res.body, [recycledRainwater]);
        done();
      })
      .catch(done);
  });

  it('DELETEs an show', done => {
    request
      .delete(`/api/shows/${recycledRainwater._id}`)
      .then(res => {
        assert.deepEqual(res.body, recycledRainwater);
        done();
      })
      .catch(done);
  });

});

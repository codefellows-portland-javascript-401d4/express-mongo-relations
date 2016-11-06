const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../lib/app');

const connection = require('../lib/setup-mongoose');

describe('city e2e test server functionality', () => {
  let req = chai.request(app);

  const cupertino = {name: 'cupertino'};
  const portland = {name: 'portland'};

  let stringCupertino = JSON.stringify(cupertino);
  let stringPortland = JSON.stringify(portland);
  let portlandPostId = '';

  before( done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'cities';
      connection.db
      .listCollections({ name })
      .next( (err, collinfo) => {
        if (!collinfo) return done();
        connection.db.dropCollection(name, done);
      });
    }
  });

  it('clears the database before starting', done => {
    req
      .get('/cities')
      .then(res => {
        expect(res).status(200);
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('POSTS successfully', done => {
    req
      .post('/cities')
      .set('Content-Type', 'application/json')
      .send(stringPortland)
      .then(res => {
        portlandPostId = JSON.parse(res.text)._id;
        assert.equal(JSON.parse(res.text).name, 'portland');
        done();
      })
      .catch(done);
  });

  it('GETs files in directory after initial POST', done => {
    req
      .get('/cities')
      .then(res => {
        expect(res).status(200);
        assert.notEqual(JSON.parse(res.text).length, 0);
        assert.include(res.text, 'portland');
        done();
      })
      .catch(done);
  });

  it('GETs a single file', done => {
    req
      .get('/cities/' + portlandPostId)
      .then(res => {
        expect(res).status(200);
        assert.equal(JSON.parse(res.text).name, 'portland');
        done();
      })
      .catch(done);
  });

  it('replaces a file using PUT', done => {
    req
      .put('/cities/' + portlandPostId)
      .set('Content-Type', 'application/json')
      .send(stringCupertino)
      .then(res => {
        expect(res).status(200);
        assert.equal(JSON.parse(res.text).name, 'cupertino');
        done();
      })
      .catch(done);
  });
});

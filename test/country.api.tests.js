const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = require('chai').assert;
const expect = require('chai').expect;

const app = require('../lib/app');

const connection = require('../lib/setup-mongoose');

describe('country e2e test server functionality', () => {
  let req = chai.request(app);

  const america = {name: 'america'};
  let stringAmerica = JSON.stringify(america);
  let americaPostId = '';

  before( done => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection(){
      const name = 'countries';
      connection.db
      .listCollections({ name })
      .next( (err, collinfo) => {
        if (!collinfo) return done();
        connection.db.dropCollection(name, done);
      });
    }
  });


  it('clears database before starting', done => {
    req
      .get('/countries')
      .then(res => {
        expect(res).status(200);
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });


  it('POSTs successfully', done => {
    req
              .post('/countries')
              .set('Content-Type', 'application/json')
              .send(stringAmerica)
              .then(res => {
                americaPostId = JSON.parse(res.text)._id;
                assert.equal(JSON.parse(res.text).name, 'america');
                done();
              })
              .catch(done);
  });

  it('GETs files in directory after initial POST', done => {
    req
              .get('/countries')
              .then(res => {
                expect(res).status(200);
                assert.notEqual(JSON.parse(res.text).length, 0);
                assert.include(res.text, 'america');
                done();
              })
              .catch(done);
  });

  it('GETs a single file', done => {
    req
              .get('/countries/' + americaPostId)
              .then(res => {
                expect(res).status(200);
                assert.equal(JSON.parse(res.text).name, 'america');
                done();
              })
              .catch(done);
  });

  it('replaces a file using PUT', done => {
    req
              .put('/countries/' + americaPostId)
              .set('Content-Type', 'application/json')
              .send(stringAmerica)
              .then(res => {
                expect(res).status(200);
                assert.equal(JSON.parse(res.text).name, 'america');
                done();
              })
              .catch(done);
  });

  it('DELETEs a file', done => {
    req
              .del('/countries/' + americaPostId)
              .then(res => {
                expect(res).status(200);
                assert.include(res.text, 'america');

                // assert.equal(res.text, '{"ok":1,"n":1}');
                done();
              })
              .catch(done);
  });
});

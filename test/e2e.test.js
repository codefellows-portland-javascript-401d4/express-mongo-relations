const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose-connection');
const app = require('../lib/app');

describe('Cats e2e', () => {

    before(done => {
        function cleardb() {
            const name = 'cats';
            connection.db
          .listCollections({name})
          .next((err, collinfo) => {
              if(!collinfo) return done();
              connection.db.dropCollection(name,done);
          });
        }
        const connected = 1;
        if(connection.readyState === connected) cleardb();
        else connection.on('open', cleardb);

    });

    const request = chai.request(app);

    const tom = {
        name: 'Tom',
        color: 'purple',
        legs: 4
    };

    it('GET all', done => {
        request.get('/api/cats')
      .then(res => {
          assert.deepEqual(res.body, []);
          done();
      });
    });
    //test passes because db is empty
    //it was cleared by the cleardb fn

    it('POST', done => {
        request.post('/api/cats')
      .send(tom)
      .then(res => {
          const cat = res.body;
          assert.ok(cat._id);
          tom.__v = 0;
          tom._id = cat._id;
          done();
      })
      .catch(done);
    });
    //test passes because we are asserting that an id exists for the object that was posted

    it('GET by ID', done => {
        request.get(`/api/cats/${tom._id}`)
      .then(res => {
          assert.deepEqual(res.body, tom);
          done();
      })
      .catch(done);
    });

    it('PUT', done => {
        request.put(`/api/cats/${tom._id}`)
        .send(tom)
        .then(res => {
            assert.ok(res.body._id);
            done();
        })
        .catch(done);
    });
    //test passes because the data sent to the existing cat, "Tom", returned the same, original id

    it('DELETE', done => {
        request.delete(`/api/cats/${tom._id}`)
      .then(res => {
          assert.deepEqual(res.body, tom);
          done();
      })
      .catch(done);
    });
    //test passes because the object in memory that was deleted matches our dummy object in test

});
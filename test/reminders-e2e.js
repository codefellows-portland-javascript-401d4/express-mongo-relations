const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe('reminders', () => {
  before(done => {
    const CONNECTED = 1;
    if(connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      console.log('we hit dropCollection');
      const name = 'reminders';
      connection.db
        .listCollections({name})
        .next((err, collectionInfo) => {
          if(!collectionInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const school = {
    title: 'class on monday',
    location: 'code fellows',
    date: '11/7/16'
  };

  const pets = {
    title: 'take care of pets',
    location: 'home',
    date: '11/6/16'
  };

  const test = {
    title: 'test',
    body: 'study for test'
  };

  it('"GET ALL" before posting', done => {
    request
      .get('/reminders')
      .then(response => {
        assert.deepEqual(response.body, []);
        done();
      })
      .catch(done);
  });

  it('handles "POST" request', done => {
    request
      .post('/reminders')
      .send(school)
      .then(response => {
        const reminder = response.body;
        assert.isOk(reminder._id);
        school._id = reminder._id;
        done();
      })
      .catch(done);
  });

  it('adds a note resource without a reminderId', done => {
    request
    .post('/notes')
    .send(test)
    .then(response => {
      const note = response.body;
      assert.isOk(note._id);
      test._id = note._id;
      done();
    })
    .catch(done);
  });

  it('adds another reminder', done => {
    request
    .post('/reminders')
    .send(pets)
    .then(response => {
      const reminder = response.body;
      assert.isOk(reminder._id);
      pets._id = reminder._id;
      done();
    })
    .catch(done);
  });

  it('responds correctly to get all', done => {
    request
    .get('/reminders')
    .then(response => {
      assert.deepEqual([school, pets], response.body);
      done();
    })
    .catch(done);
  });

  it('handels can attach foriegn key to a note resource with "PUT"', done => {
    request
      .put(`/reminders/${school._id}/notes/${test._id}`)
      .then(response => {
        const note = response.body;
        school.notes = [test];
        assert.deepEqual(note.reminderId, school._id);
        done();
      })
      .catch(done);
  });

  it('handles "GET" requests', done => {
    request
    .get(`/reminders/${school._id}`)
    .then(response => {
      assert.deepEqual(school, response.body);
      done();
    })
    .catch(done);
  });

  it('Deletes resources', done => {
    request
      .delete(`/reminders/${pets._id}`)
      .then(response => {
        assert.equal('You have deleted a reminder!', response.text);
        done();
      })
      .catch(done);
  });

  it('deleted resource no longer in DB', done => {
    request
      .get('/reminders')
      .then(response => {
        assert.equal(1, response.body.length);
        done();
      })
      .catch(done);
  });
  
  it('responds to a bad "GET" request', done => {
    request
      .get('/reminders/notarealid')
      .then(() => done('We should have caught and error!'))
      .catch(res => {
        assert.equal(res.response.res.statusCode, 404);
        assert.equal(res.response.res.text, '404 ERROR: Bad request path, resource does not exist');
        done();
      });
  });
  it('handles bad JSON', done => {
    request
      .post('/reminders')
      .send('{title":"test}')
      .then(() => done('We should have caught and error!'))
      .catch(res => {
        assert.equal(res.response.res.text, '400 ERROR: Invalid data input');
        assert.equal(res.response.res.statusCode, 400);
        done();
      });
  });

  after(done => {
    connection.close(done);
  });
});

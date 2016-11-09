const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe('notes', () => {
  before(done => {
    const CONNECTED = 1;
    if(connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      console.log('we hit dropCollection');
      const name = 'notes';
      connection.db
        .listCollections({name})
        .next((err, collectionInfo) => {
          if(!collectionInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const cat = {
    title: 'cat',
    body: 'get the cat',
    done: false
  };

  const homeWork = {
    title: 'homework',
    body: 'do your homework',
    done: true
  };

  const reminder = {
    title: 'test',
    location: 'testville',
    date: '1/1/01'
  };


  it('"GET ALL" before posting', done => {
    request
      .get('/notes')
      .then(response => {
        assert.deepEqual(response.body, []);
        done();
      })
      .catch(done);
  });

  it('handles "POST" request', done => {
    request
      .post('/notes')
      .send(cat)
      .then(response => {
        const note = response.body;
        assert.isOk(note._id);
        cat._id = note._id;
        done();
      })
      .catch(done);
  });

  it('handles "GET" requests', done => {
    request
      .get(`/notes/${cat._id}`)
      .then(response => {
        assert.deepEqual(cat, response.body);
        done();
      })
      .catch(done);
  });

  it('adds another note with "done" = true', done => {
    request
      .post('/notes')
      .send(homeWork)
      .then(response => {
        const note = response.body;
        assert.deepEqual(note.done, true);
        homeWork._id = note._id;
        done();
      })
      .catch(done);
  });

  it('adds a reminder', done => {
    request
      .post('/reminders')
      .send(reminder)
      .then(response => {
        assert.isOk(response.body);
        reminder._id = response.body._id;
        done();
      })
      .catch(done);
  });
  it('adds reminder Id to resource', done => {
    cat.reminderId = reminder._id;
    request
      .put(`/notes/${cat._id}`)
      .send(cat)
      .then(response => {
        assert.equal(response.body.reminderId, reminder._id);
        done();
      })
      .catch(done);
  });

  it('GET on resource with reminderId returns relations', done => {
    request
      .get(`/notes/${cat._id}`)
      .then(response => {
        assert.deepEqual(response.body.reminderId, reminder);
        cat.reminderId = response.body.reminderId;
        done();
      })
      .catch(done);
  });
  it('responds correctly to get all', done => {
    request
      .get('/notes')
      .then(response => {
        assert.deepEqual([cat, homeWork], response.body);
        done();
      })
      .catch(done);
  });

  it('counts number of unfinished tasks', done => {
    request
      .get('/notes/todo')
      .then(response => {
        assert.deepEqual(response.body.length, 1);
        done();
      })
      .catch(done);
  });

  it('Deletes resources', done => {
    request
      .delete(`/notes/${cat._id}`)
      .then(response => {
        assert.equal('You have deleted a note!', response.text);
        done();
      })
      .catch(done);
  });

  it('deleted resource no longer in DB', done => {
    request
      .get('/notes')
      .then(response => {
        assert.equal(1, response.body.length);
        done();
      })
      .catch(done);
  });
  it('responds to a bad "GET" request', done => {
    request
      .get('/notes/notarealid')
      .then(() => done('We should have thrown and error!'))
      .catch(res => {
        assert.equal(res.response.res.statusCode, 404);
        assert.equal(res.response.res.text, '404 ERROR: Bad request path, resource does not exist');
        done();
      });
  });
  it('handles bad JSON', done => {
    request
      .post('/notes')
      .send('{title":"test}')
      .catch(res => {
        assert.equal(res.response.res.statusCode, 400);
        assert.equal(res.response.res.text, '400 ERROR: Invalid data input');
        done();
      });
  });

});

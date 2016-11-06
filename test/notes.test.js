const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//to test validation
const Note = require('../lib/models/note');

//need to connect to db
const connection = require('../lib/set-mongoose');

const app = require('../lib/app');

describe('the note model', () => {
  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'notes';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const noteTested =
    {
      title: 'note for testing',
      text: 'test and learn',
      tags: ['notes', 'terminal', 'testing']
    };

  it('validates with title and text', (done) => {
    const note = new Note({
      title: 'validation note test',
      text: 'and some validation testing text'
    });

    note.validate((err) => {
      if (!err) done();
      else done(err);
    });
  });

  it('requires a title to validate', (done) => {
    const note = new Note();
    note.text = 'another testing text';

    note.validate((err) => {
      expect(err, 'title should have been required').to.be.ok;
      done();
    });
  });

  it('navigates to POST and stashes a new note', (done) => {
    request
      .post('/notes')
      .send(noteTested)
      .then((res) => {
        const note = res.body;
        expect(note.data._id).to.be.ok;
        noteTested.__v = 0;
        noteTested._id = note.data._id;
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all notes', (done) => {
    request
      .get('/notes')
      .then((res) => {
        expect(res.body).is.ok;
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a note by id', (done) => {
    request
      .get(`/notes/${noteTested._id}`)
      .then((res) => {
        const note = res.body;
        expect(note.data.text).to.deep.equal('test and learn');
        done();
      })
      .catch(done);
  });

  it('stashes a note with no tags', (done) => {
    request
      .post('/notes')
      .send({title: 'empty note test', text: 'not so empty'})
      .then((res) => {
        expect(res.body.data._id).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates a note in the database', (done) => {
    request
      .put(`/notes/${noteTested._id}`)
      .send({title: 'modified note for testing', text: 'modified text', tags: ['notes', 'terminal', 'testing']})
      .then((res) => {
        expect(res.body.data.text).to.deep.equal('modified text');
        done();
      })
      .catch(done);
  });

  it('deletes a note from the database', (done) => {
    request
      .delete(`/notes/${noteTested._id}`)
      .then(() => {
        request
          .get(`/notes/${noteTested._id}`)
          .then((res) => {
            expect(res.body.data).to.deep.equal(undefined);
          });
        done();
      })
      .catch(done);
  });

  it('returns the last 5 updated notes', (done) => {
    request
      .get('/notes/last5/notes')
      .then((data) => {
        expect(data.length <= 5);
        done();
      })
      .catch(done);
  });

});
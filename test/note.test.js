const Note = require('../lib/models/note');
const assert = require('chai').assert;

describe('Note model', () => {
  it('Validates note with title and body', done => {
    const note = new Note({
      title: 'test',
      body: 'this is a test'
    });

    note.validate(err => {
      if(!err) done();
      else done(err);
    });
  });

  it('title is required', done => {
    const note = new Note({
      body: 'this note has no title!?'
    });
    note.validate(err => {
      assert.isOk(err);
      done();
    });
  });

  it('done is set to "false" by default', done => {
    const note = new Note({
      title: 'test',
    });
    assert.deepEqual(note.done, false);
    done();
  });
});

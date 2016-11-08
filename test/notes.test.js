const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//to test validation
const Note = require('../lib/models/note');

describe('unit testing the note model', () => {

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

});
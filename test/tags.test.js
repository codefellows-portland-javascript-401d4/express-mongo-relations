const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//to test validation
const Tag = require('../lib/models/tag');

describe('the tag model', () => {

  it('validates with name', (done) => {
    const tag = new Tag({
      name: 'validation tag test',
      description: 'and some validation testing text'
    });

    tag.validate((err) => {
      if (!err) done();
      else done(err);
    });
  });

  it('requires a name to validate', (done) => {
    const tag = new Tag();
    tag.description = 'for testing';

    tag.validate((err) => {
      expect(err, 'name should have been required').to.be.ok;
      done();
    });
  });
  
});
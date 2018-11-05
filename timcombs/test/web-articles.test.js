const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//to test validation
const WebArticle = require('../lib/models/web-article');

describe('the web article model', () => {
  
  it('validates with title, description, url', (done) => {
    const webArticle = new WebArticle({
      title: 'validation web article test',
      description: 'and some validation testing text',
      url: 'http://www.sometest.test'
    });

    webArticle.validate((err) => {
      if (!err) done();
      else done(err);
    });
  });

  it('requires a title to validate', (done) => {
    const webArticle = new WebArticle();
    webArticle.description = 'another testing text';
    webArticle.url = 'http://www.good.test';

    webArticle.validate((err) => {
      expect(err, 'title should have been required').to.be.ok;
      done();
    });
  });

});
const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

mongoose.Promise = Promise;

describe('E2E testing the server', () => {
  it('returns status code = 200 on successful requests', (done) => {
    chai.request(server)
      .get('/notes')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('sends response to POST request for specific file', (done) => {
    chai.request(server)
      .post('/test1')
      .send({title: 'test1', text: 'testtest'})
      .then((res) => {
        expect(res);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('fails when navigating to an unknown path', (done) => {
    chai.request(server)
      .get('/nowhere/fast')
      .then(() => {
        done();
      })
      .catch((err) => {
        expect(err).to.have.status(400);
        expect(err.message).to.be.equal('no path by that name, please check you map.');
        done(err);
      });
  });

});
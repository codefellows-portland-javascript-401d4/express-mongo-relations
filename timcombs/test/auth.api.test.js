const app = require('../lib/app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//connect to db
const connection = require('../lib/set-mongoose');
//connect to server
const request = chai.request(app);

describe('authentication/authorization testing', () => {
  //drop whole database, not just one collection
  before((done) => {
    const drop = () => connection.db.dropDatabase(done);
    if (connection.readyState === 1) drop();
    else connection.on('open', drop);
  });

  describe('token authorization check', () => {
    it('returns status = 400 when no token exists', (done) =>{
      request
        .get('/notes')
        .then((res) => { //eslint-disable-line
          done('status should != 200');
        })
        .catch((err) => {
          expect(err.status).to.deep.equal(400);
          expect(err.response.body.error).to.equal('unauthorized, no token provided');
          done();
        })
        .catch(done);
    });

    it('returns status = 403 when token is invalid', (done) => {
      request
        .get('/notes')
        .set('Authorization', 'Bearer badtoken')
        .then((res) => { //eslint-disable-line
          done('status should != 200');
        })
        .catch((res) => {
          expect(res.status).to.deep.equal(403);
          expect(res.response.body.error).to.deep.equal('unauthorized, invalid token');
          done();
        })
        .catch(done);
    });

  });

  describe('managing the users', () => {
    const user = {
      username: 'Testa Persona',
      password: 'p4$$w04d',
    };

    let token = '';

    function badRequest(url, send, error, done) {
      request
        .post(url)
        .send(send)
        .then((res) => { //eslint-disable-line
          done('status should != 200');
        })
        .catch((res) => {
          expect(res.status).to.deep.equal(400);
          expect(res.response.body.error).to.deep.equal(error);
          done();
        })
        .catch(done);
    }

    it('needs a username to complete signup', (done) => {
      badRequest('/auth/signup', {password: 'xyz'}, 'username and password must be supplied', done);
    });

    it('needs a password to complete signup', (done) => {
      badRequest('/auth/signup', {username: 'xyz'}, 'username and password must be supplied', done);
    });

    it('sends a token on sign-up', (done) => {
      request
        .post('/auth/signup')
        .send(user)
        .then((res) => {
          token = res.body.token;
          expect(token).to.be.ok;
        })
        .then(() => {
          done();//succeeded move to next block
        })
        .catch((err) => {
          done(err); //calling done with a parameter handle as an error!
        });
    });

    it('requires unique usernames', (done) => {
      badRequest('/auth/signup', user, 'username Testa Persona already exists', done);
    });

    it('makes sure token is valid', (done) => {
      request
        .get('/notes')
        .set('Authorization', `Bearer ${token}`)
        .then((res) => {
          expect(res.body).to.be.ok;
        })
        .then(() => {
          done();//succeeded move to next block
        })
        .catch((err) => {
          done(err); //calling done with a parameter handle as an error!
        });
    });

    it('sends a token on sign-in', (done) => {
      request
        .post('/auth/signin')
        .send(user)
        .then((res) => {
          expect(res.body.token).to.be.ok;
        })
        //.then(done, done); //this code is the same as the following 2 blocks
        .then(() => {
          done();//succeeded move to next block
        })
        .catch((err) => {
          done(err); //calling done with a parameter handle as an error!
        });
    });

     
    it('returns status = 400 when user has no role', (done) => {
      const tagTested = {
        name: 'tag for testing',
        description: 'test and learn',
        heat: 'warm'
      };

      request
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send(tagTested)
      .then(() => {
        done('should never be called');
      })
      .catch((res) => {
        expect(res).to.have.status(400);
        expect(res.response.body.error).to.deep.equal('not authorized');
        done();
      })
      .catch(done);
    });

    it('returns status = 400 when user has improper role', (done) => {
      const anotherTag = {
        name: 'another tag for testing',
        description: 'test and learn and learn again',
        heat: 'cool'
      };

      const anotherUser = {
        username: 'Fresca Perdoni',
        password: '123456',
        role: ['stupid']
      };

      let anotherToken = '';

      it('sends a token on sign-up', (done) => {
        request
          .post('/auth/signup')
          .send(anotherUser)
          .then((res) => {
            anotherToken = res.body.token;
            expect(anotherToken).to.be.ok;
          })
          .then(() => {
            done();//succeeded move to next block
          })
          .catch((err) => {
            done(err); //calling done with a parameter handle as an error!
          });
      });
  
      request
      .post('/tags')
      .set('Authorization', `Bearer ${token}`)
      .send(anotherTag)
      .then(() => {
        done('should never be called');
      })
      .catch((res) => {
        expect(res).to.have.status(400);
        expect(res.response.body.error).to.deep.equal('not authorized');
        done();
      })
      .catch(done);
    });

  });

});
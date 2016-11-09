const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup_mongoose');

const app = require('../lib/app');

describe ('auth', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    const request = chai.request(app);

    describe('unauthorized', () => {

        it('status code 400(bad request) with no token', done => {
            request
            .get('/api/players')
            .then(res => done(res, 'status code should not be 200'))
            .catch(res => {
                assert.equal(res.status, 400);
                assert.equal(res.response.body.error, 'unauthorized: no token provided');
                done();
            })
            .catch(done);
        });

        it('status code 403(forbidden) with invalid token', done => {
            request
                .get('/api/players')
                .set('Authorization', 'Bearer this.token.invalid')
                .then(res => done(res, 'status code should not be 200'))
                .catch(res => {
                    assert.equal(res.status, 403);
                    assert.equal(res.response.body.error, 'unauthorized: invalid token');
                    done();
                })
                .catch(done);
        });

        const user = {
            username: 'Test User',
            password: 'abcd1234'
        };

        describe('user management', () => {

            function invalidRequest(url, send, error, done) {
                request
                    .post(url)
                    .send(send)
                    .then(res => done(res, 'status code should not be 200'))
                    .catch(res => {
                        assert.equal(res.status, 400);
                        assert.equal(res.response.body.error, error);
                        done();
                    })
                    .catch(done);
            }

            it('signup requires a username', done => {
                invalidRequest('/api/auth/signup', { username: 'username'}, 'username and password must be entered', done);
            });

            it('signup requires a password', done => {
                invalidRequest('/api/auth/signup', { password: 'abcd1234'}, 'username and password must be entered', done);
            });

            let token = '';

            it('signup', done => {
                request
                    .post('/api/auth/signup')
                    .send(user)
                    .then(res => {
                        assert.ok(token = res.body.token);
                        done();
                    })
                    .catch(done);
            });

            it('cannot use same username', done => {
                invalidRequest('/api/auth/signup', user, 'username Test User has been used', done);
            });

            it( 'token is valid', done => {
                request
                    .get('/api/players')
                    .set('Authorization', `Bearer ${token}`)
                    .then(res => assert.ok(res.body))
                    .then(done, done );
            });

            it('signin', done => {
                request
                    .post('/api/auth/signin')
                    .send(user)
                    .then(res => assert.equal( res.body.token, token ))
                    .then(done, done );
            });
        });
    });

});

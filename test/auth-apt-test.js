const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');

const app = require('../lib/app');

describe('auth', () => {

    before( done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else connection.on('open', drop);
    });
    const request = chai.request(app);

    describe('unauthorized', () => {

        it('400 with no token', done => {
            request
                .get('/movies')
                .then(res => done('status should not be 200'))
                .catch(res => {
                    assert.equal(res.status, 400);
                    assert.equal(res.response.body.error, 'unauthorized, no token provided');
                    done();
                })
                .catch(done);
        });

        it('403 with invalid token', done => {
            request
                .get('/movies')
                .set('Authorization', 'Bearer badtoken')
                .then(res => done('status should not be 200'))
                .catch(res => {
                    assert.equal(res.status, 403);
                    assert.equal(res.response.body.error, 'unauthorized, invalid token');
                    done();
                })
                .catch(done);
        });
    });

    const user = {username: 'testy', password: 'abc', roles: 'admin'};

    describe ('user management', () => {

        function badRequest (url, send, error, done){
            request
                .post(url)
                .send(send)
                .then(res => done('status should not be 200'))
                .catch(res => {
                    assert.equal(res.status, 400);
                    assert.equal(res.response.body.error, error);
                    done();
                })
                .catch(done);
        }

        it('signup requires username', done => {
            badRequest('/auth/signup', {password: 'hello'}, 'username and password required', done);
        });

        it('signup requires password', done => {
            badRequest('/auth/signup', {username: 'hello'}, 'username and password required', done);
        });
        
        let token = '';

        it('signup', done => {
            request
                .post('/auth/signup')
                .send(user)
                .then(res => assert.ok(token = res.body.token))
                .then(done, done);
        });

        it('cannot use same username', done => {
            badRequest('/auth/signup', user, 'username testy already exists', done);
        });

        it('token is valid', done => {
            request
                .get('/movies')
                .set('authorization', `Bearer ${token}`)
                .then(res => assert.ok(res.body))
                .then(done, done);
        });

        it('signin', done => {
            request
                .post('/auth/signin')
                .send(user)
                .then(res => {
                    assert.deepEqual(res.body, {token});
                })
                .then(done, done);
        });
    });
});

'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');
const request = chai.request(app);

describe('unauthorized', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    it('400 no token', done => {
        request.get('/characters/')
            .then(res => done('status should be 400')) //eslint-disable-line
            .catch(res => {
                assert.equal(res.status, 400);
                assert.equal(res.response.body.error, 'unauthorized, no token provided');
                done();
            })
            .catch(done);
    });

    it('403 invalid token', done => {
        request
            .get('/characters')
            .set('Authorization', 'invalidToken')
            .then(res => done('status should be 403')) //eslint-disable-line
            .catch(res => {
                assert.equal(res.response.body.error, 'unauthorized, invalid token');
                done();
            })
            .catch(done);
    });
});

describe('user management', () => {

    const user = {
        username: 'Viper',
        password: 'password'
    };
    let token = '';

    function badRequest(url, send, error, done) {
        request
            .post(url)
            .send(send)
            .then(res => done('status should not be 200')) //eslint-disable-line
            .catch(res => {
                assert.equal(res.status, 400);
                assert.equal(res.response.body.error, error);
                done();
            })
            .catch(done);
    }

    it('signup requires username', done => {
        badRequest('/auth/signup', { password: 'password' }, 'username and password must be supplied', done);
    });

    it('signup requires password', done => {
        badRequest('/auth/signup', { username: 'Viper' }, 'username and password must be supplied', done);
    });

    it('signs up', done => {
        request
            .post('/auth/signup')
            .send(user)
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    it('username must be unique', done => {
        badRequest('/auth/signup', user, 'username Viper already exists', done);
    });

    it('signs in', done => {
        request
            .post('/auth/signin')
            .send(user)
            .then(res => assert.equal(token, res.body.token))
            .then(done, done);
    });

    // it('blocks secure route', done => {
    //     request
    //         .request('/characters')
    //         .then()
    // });
});
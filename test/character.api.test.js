'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');
const request = chai.request(app);

describe('character end to end test', () => {

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    let token = '';

    before(done => {
        request
            .post('/auth/signup')
            .send({ username: 'testuser', password: 'testpassword', roles: 'admin' })
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    const geralt = {
        name: 'Geralt',
        sex: 'male',
        race: 'Witcher'
    };


    it('GETs all', done => {
        request
            .get('/characters')
            .set('Authorization', token)
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs', done => {
        request
            .post('/characters')
            .set('Authorization', token)
            .send(geralt)
            .then(res => {
                const character = res.body;
                geralt.__v = 0;
                geralt._id = character._id;
                done();
            })
            .catch(done);
    });

    it('GETs by ID', done => {
        request
            .get(`/characters/${geralt._id}`)
            .set('Authorization', token)
            .then(res => {
                const character = res.body;
                assert.deepEqual(character, geralt);
                done();
            })
            .catch(done);
    });

    it('GETs where sex is male', done => {
        request
            .get('/characters')
            .set('Authorization', token)
            .query({sex: 'male'})
            .then(res => {
                assert.deepEqual(res.body, [geralt]);
                done();
            })
            .catch(done);
    });

    it('DELETEs by ID', done => {
        request
            .delete(`/characters/${geralt._id}`)
            .set('Authorization', token)
            .then(res => {
                assert.deepEqual(res.body, geralt);
                done();
            })
            .catch(done);
    });
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use (chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe ('actor', () => {

    before( done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    const request = chai.request(app);
    let token = '';

    before(done => {
        request
            .post('/auth/signup')
            .send({username: 'testuser', password: 'abc', roles: 'admin'})
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    const alPacino = {
        name: 'Al Pacino',
        gender: 'male',
        movieId: [],
        academyAward: true
    };

    it ('Get All', done =>{
        request
            .get('/actors')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });
    it('Post', done => {
        request
            .post('/actors')
            .set('Authorization', `Bearer ${token}`)
            .send(alPacino)
            .then(res => {
                const actor = res.body;
                assert.ok(actor._id);
                alPacino._id = actor._id;
                done();
            })
            .catch(done);
    });
    it('Get all after Post', done => {
        request
            .get('/actors')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.deepEqual(res.body, [alPacino]);
                done();
            })
            .catch(done);
    });
    it ('get by id', done => {
        request
        .get(`/actors/${alPacino._id}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const actor = res.body;
            assert.deepEqual(actor, alPacino);
            done();
        })
        .catch(done);
    });
    it('gets by name', done => {
        request
        .get(`/actors?name=Al%20Pacino`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const actor = res.body;
            assert.deepEqual(actor, [alPacino]);
            done();
        })
        .catch(done);
    });
    it('gets academy award winners', done =>{
        request
        .get(`/actors/aa/true`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const actor = res.body;
            assert.deepEqual(actor, [alPacino]);
            done();
        })
        .catch(done);
    });
    it('deletes', done => {
        request
            .delete(`/actors/${alPacino._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.isOk(res.body, 'deleted');
                done();
            })
            .catch(done);
    });
});
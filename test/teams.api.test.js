const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup_mongoose');

const app = require('../lib/app');

describe('team', () => {

    before( done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else (connection.on('open', drop));
    });

    const request = chai.request(app);
    let token = '';

    before( done => {
        request
            .post('/api/auth/signup')
            .send({ username: 'tester2', password: 'pass1234', roles: ['admin']})
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    let snap = {
        teamName: 'Oh Snap!',
        wins: 5
    };


    it('/POST', done => {
        request
            .post('/api/teams')
            .set('Authorization', `Bearer ${token}`)
            .send(snap)
            .then(res => {
                const team = res.body;
                assert.ok(team._id);
                snap = team;
                done();
            })
            .catch(done);
    });
    //
    it('/GET by id', done => {
        request
            .get(`/api/teams/${snap._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                const team = res.body;
                assert.deepEqual = (team, snap);
                done();
            })
            .catch(done);
    });

    it('/GET all after a post', done => {
        request
            .get('/api/teams/')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0]._id, snap._id);
                done();
            })
            .catch(done);
    });

    it('/GET where wins is a number', done => {
        request
            .get('/api/teams')
            .set('Authorization', `Bearer ${token}`)
            .query({ position: 5})
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0]._id, snap._id);
                done();
            })
            .catch(done);
    });

    after(done => {
        connection.close( done );
    });


});

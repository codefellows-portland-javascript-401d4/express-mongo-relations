const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup_mongoose');

const app = require('../lib/app');

describe('player', () => {

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
            .send({ username: 'tester', password: 'pass1234'})
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    let antonio = {
        playerName: 'Antonio Brown',
        position: 'WR'
    };

    it('/GET all', done => {
        request
            .get('/api/players')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('/POST', done => {
        request
            .post('/api/players')
            .set('Authorization', `Bearer ${token}`)
            .send(antonio)
            .then(res => {
                const player = res.body;
                assert.ok(player._id);
                antonio = player;
                done();
            })
            .catch(done);
    });

    it('/GET by id', done => {
        request
            .get(`/api/players/${antonio._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                const player = res.body;
                assert.deepEqual = (player, antonio);
                done();
            })
            .catch(done);
    });

    it('/GET all after a post', done => {
        request
            .get('/api/players/')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0]._id, antonio._id);
                done();
            })
            .catch(done);
    });

    it('/GET where position is WR', done => {
        request
            .get('/api/players')
            .set('Authorization', `Bearer ${token}`)
            .query({ position: 'WR'})
            .then(res => {
                assert.equal(res.body.length, 1);
                assert.equal(res.body[0]._id, antonio._id);
                done();
            })
            .catch(done);
    });

});

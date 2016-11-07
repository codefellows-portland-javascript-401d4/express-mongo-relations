const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use (chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe ('actor', () => {

    before( done => {
        const Connected = 1;
        if (connection.readyState === Connected) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'actors';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);

    const alPacino = {
        name: 'Al Pacino',
        gender: 'male',
        movieId: [],
        academyAward: true
    };

    it ('Get All', done =>{
        request
            .get('/actors')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });
    it('Post', done => {
        request
            .post('/actors')
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
            .then(res => {
                assert.deepEqual(res.body, [alPacino]);
                done();
            })
            .catch(done);
    });
    it ('get by id', done => {
        request
        .get(`/actors/${alPacino._id}`)
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
            .then(res => {
                assert.isOk(res.body, 'deleted');
                done();
            })
            .catch(done);
    });
});
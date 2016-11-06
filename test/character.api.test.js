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
        const CONNECTED = 1;
        if(connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'characters';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if(!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const geralt = {
        name: 'Geralt',
        sex: 'male',
        race: 'Witcher'
    };


    it('GETs all', done => {
        request
            .get('/characters')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs', done => {
        request
            .post('/characters')
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
            .then(res => {
                assert.deepEqual(res.body, geralt);
                done();
            })
            .catch(done);
    });
});
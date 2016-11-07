'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);
const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');
const request = chai.request(app);

describe('game end to end test', () => {

    before(done => {
        const CONNECTED = 1;
        if(connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'games';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if(!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const witcher3 = {
        title: 'The Witcher 3',
        developer: 'CD Projekt Red',
        released: '5/19/15',
        platform: ['PC', 'Playstation 4', 'Xbox One']
    };

    it('GETs all', done => {
        request
            .get('/games')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POSTs', done => {
        request
            .post('/games')
            .send(witcher3)
            .then(res => {
                const game = res.body;
                witcher3.__v = 0;
                witcher3._id = game._id;
                done();
            })
            .catch(done);
    });

    it('GETs by ID with characters', done => {
        request
            .get(`/games/${witcher3._id}`)
            .then(res => {
                const game = res.body;
                console.log('body', game);
                assert.property(game, 'characters');
                done();
            })
            .catch(done);
    });

    it('GETs where developer is CD Projekt Red', done => {
        request
            .get('/games')
            .query({developer: 'CD Projekt Red'})
            .then(res => {
                assert.deepEqual(res.body, [witcher3]);
                done();
            })
            .catch(done);
    });

    it('DELETEs by ID', done => {
        request
            .delete(`/games/${witcher3._id}`)
            .then(res => {
                assert.deepEqual(res.body, witcher3);
                done();
            })
            .catch(done);
    });
});
'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');
const request = chai.request(app);

describe('movements api', () => {
    before(done => {
        const connected = 1;
        if(connection.readyState === connected) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'movements';
            connection.db
                .listCollections({ name })
                .next((error, collectinfo) => {
                    if(!collectinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);

    const testMovement = {
        name: 'surrealism',
        start: 1924,
        end: 1966
    };

    it('/GETs all movements', done => {
        request 
            .get('/movements')
            .then(response => {
                assert.deepEqual(response.body, []);
                done();
            })
            .catch(done);
    });

    it('/POSTs a new movement', done => {
        request
            .post('/movements')
            .send(testMovement)
            .then(response => {
                const movement = response.body;
                assert.ok(movement._id);
                testMovement.__v = 0;
                testMovement._id = movement._id;
                done();
            })
            .catch(done);
    });

    it('/GETs a movement by id', done => {
        request
            .get(`/movements/${testMovement._id}`)
            .then(response => {
                testMovement.artists = [];
                const movement = response.body;
                assert.deepEqual(movement, testMovement);
                done()
            })
            .catch(done);
    });

    it('/GETs all movements after new post', done => {
        request
            .get('/movements')
            .then(response => {
                delete testMovement.artists;
                assert.deepEqual(response.body, [testMovement]);
                done();
            })
            .catch(done);
    });

    it('updates a movement for /PUT request', done => {
        request
            .put(`/movements/${testMovement._id}`)
            .send(testMovement.name)
            .then(response => {
                const update = response.body.name
                assert.deepEqual(update, testMovement.name);
                done();
            })
            .catch(done);
    });

    it('removes a movement for /DELETE request', done => {
        request 
            .delete(`/movements/${testMovement._id}`)
            .then(response => {
                assert.isOk(response.body, 'deleted');
                done();
            })
            .catch(done);
    });
});

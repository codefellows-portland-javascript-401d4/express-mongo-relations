'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe('artists api', () => {
    before(done => {
        function dropCollection() {
            const name = 'painters';
            connection.db
                .listCollections({ name })
                .next((error, collectinfo) => {
                    if(!collectinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
        const connected = 1;
        if(connection.readyState === connected) dropCollection();
        else connection.on('open', dropCollection);
    });

    const request = chai.request(app);

    const testPainter = {
        name: 'salvador dalí',
        style: 'surrealism'
    };

    it('/GETs all artists', done => {
        request 
            .get('/artists')
            .then(response => {
                assert.deepEqual(response.body, []);
                done();
            })
            .catch(done);
    });

    it('/POSTs a new artist', done => {
        request
            .post('/artists')
            .send(testPainter)
            .then(response => {
                const painter = response.body;
                assert.ok(painter._id);
                testPainter.__v = 0;
                testPainter._id = painter._id;
                done();
            })
            .catch(done);
    });

    it('/GETs all artists after new post', done => {
        request
            .get('/artists')
            .then(response => {
                assert.deepEqual(response.body, [testPainter]);
                done();
            })
            .catch(done);
    });

    it('/GETs an artist by id', done => {
        request
            .get(`/artists/${testPainter._id}`)
            .then(response => {
                const painter = response.body;
                assert.deepEqual(painter, testPainter);
                done()
            })
            .catch(done);
    });

    it('removes an artist for /DELETE request', done => {
        request 
            .delete(`/artists/${testPainter._id}`)
            .then(response => {
                assert.isOk(response.body, 'deleted');
                done();
            })
            .catch(done);
    });
});

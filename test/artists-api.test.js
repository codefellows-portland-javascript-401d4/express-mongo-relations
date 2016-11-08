'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe('artists api', () => {
    before(done => {
        const connected = 1;
        if(connection.readyState === connected) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'artists';
            connection.db
                .listCollections({ name })
                .next((error, collectinfo) => {
                    if(!collectinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);

    const testArtist = {
        name: 'salvador dalí',
        birthdate: 'May 11th',
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
            .send(testArtist)
            .then(response => {
                const artist = response.body;
                assert.ok(artist._id);
                testArtist.__v = 0;
                testArtist._id = artist._id;
                done();
            })
            .catch(done);
    });

    it('/GETs an artist by id', done => {
        request
            .get(`/artists/${testArtist._id}`)
            .then(response => {
                const artist = response.body;
                assert.deepEqual(artist, testArtist);
                done()
            })
            .catch(done);
    });

    it.skip('/GETs all artists after new post', done => {
        request
            .get('/artists')
            .then(response => {
                assert.deepEqual(response.body, [testArtist]);
                done();
            })
            .catch(done);
    });

    it('removes an artist for /DELETE request', done => {
        request 
            .delete(`/artists/${testArtist._id}`)
            .then(response => {
                assert.isOk(response.body, 'deleted');
                done();
            })
            .catch(done);
    });
});

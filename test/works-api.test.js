'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe('works api', () => {
    before(done => {
        const connected = 1;
        if(connection.readyState === connected) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'paintings';
            connection.db
                .listCollections({ name })
                .next((error, collectinfo) => {
                    if(!collectinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);
    
    const testPainting = {
        title: 'sugar sphinx',
        year: 1933
    };

    it('/GETs all works', done => {
        request 
            .get('/works')
            .then(response => {
                assert.deepEqual(response.body, []);
                done();
            })
            .catch(done);
    });

    it('/POSTs a new work', done => {
        request
            .post('/works')
            .send(testPainting)
            .then(response => {
                const painting = response.body;
                assert.ok(painting._id);
                testPainting.__v = 0;
                testPainting._id = painting._id;
                done();
            })
            .catch(done);
    });

    it('/GETs all works after new post', done => {
        request
            .get('/works')
            .then(response => {
                assert.deepEqual(response.body, [testPainting]);
                done();
            })
            .catch(done);
    });

    it('/GETs a work by id', done => {
        request
            .get(`/works/${testPainting._id}`)
            .then(response => {
                const painting = response.body;
                assert.deepEqual(painting, testPainting);
                done()
            })
            .catch(done);
    });

    it('removes a work for /DELETE request', done => {
        request 
            .delete(`/works/${testPainting._id}`)
            .then(response => {
                assert.isOk(response.body, 'deleted');
                done();
            })
            .catch(done);
    });
});

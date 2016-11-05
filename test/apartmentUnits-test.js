const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/mongoose-config');
const app = require('../lib/app');

describe('Validating ApartmentUnits', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'apartmentunits';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const testAptUnit = {
        name: 'Test Apartment',
        location: 'random floor',
        nbrbdrms: 2,
        nbrbaths: 2,
        totalsize: 1500,
        bldgId: '581d1eee6823e51ab3d78fbe'
    };

    const testAptUnitUpd = {
        location: 'specific floor',
        totalsize: 100
    };

    const testAptUnitFinal = {
        name: 'Test Apartment',
        location: 'specific floor',
        nbrbdrms: 2,
        nbrbaths: 2,
        totalsize: 100,
        bldgId: '581d1eee6823e51ab3d78fbe'
    };

    const request = chai.request(app);

    it('GET all ', done => {
        request
            .get('/api/apartmentunits')
            .then( res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POST request', done => {
        request
            .post('/api/apartmentunits')
            .send(testAptUnit)
            .then(res => {
                const aptUnit = res.body;
                assert.ok(aptUnit._id);
                testAptUnit._id = aptUnit._id;
                testAptUnit.__v = 0;
                testAptUnitFinal._id = aptUnit._id;
                testAptUnitFinal.__v = 0;
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
        request
            .get(`/api/apartmentunits/${testAptUnit._id}`)
            .then( res => {
                assert.deepEqual(res.body, testAptUnit);
                done();
            })
            .catch(done);
    });

    it('GET all after POST', done => {
        request
            .get('/api/apartmentunits')
            .then( res => {
                assert.deepEqual(res.body, [testAptUnit]);
                done();
            })
            .catch(done);
    });

    it('PUT request', done => {
        request
            .put(`/api/apartmentunits/${testAptUnit._id}`)
            .send(testAptUnitUpd)
            .then(res => {
                assert.deepEqual(res.body, testAptUnit);
                done();
            })
            .catch(done);
    });

    it('DELETE request', done => {
        request
            .delete(`/api/apartmentunits/${testAptUnit._id}`)
            .then(res => {
                assert.deepEqual(res.body, testAptUnitFinal);
                done();
            })
            .catch(done);
    });

});


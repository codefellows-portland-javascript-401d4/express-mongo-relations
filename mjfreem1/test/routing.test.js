const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
require('../lib/mongoose');
const app = require('../lib/app');

describe('city and country routing', () => {
    const req = chai.request(app);

    let russia = {
        name: 'Russia',
        provinces: 85
    };

    const kazan = {
        name: 'Kazan',
        population: 1000000,
    };

    it('GET empty array before POST', done => {
        req
            .get('/countries')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });

    it('POST a city', done => {
        req
            .post('/cities')
            .send(kazan)
            .then(res => {
                const city = res.body;
                kazan.__v = 0;
                kazan._id = city._id;
                assert.deepEqual(city, kazan);
                done();
            })
            .catch(done);
    });

    it('GET city by id', done => {
        req
            .get(`/cities/${kazan._id}`)
            .then(res => {
                const city = res.body;
                assert.deepEqual(city, kazan);
                done();
            })
            .catch(done);
    });

    it('POST a country', done => {
        req
            .post('/countries')
            .send(russia)
            .then(res => {
                const country = res.body;
                russia.__v = 0;
                russia._id = country._id;
                assert.deepEqual(country, russia);
                done();
            })
            .catch(done);
    });

    it('GET country by id', done => {
        req
            .get(`/countries/${russia._id}`)
            .then(res => {
                const country = res.body;
                russia.cities = country.cities;
                assert.deepEqual(country, russia);
                done();
            })
            .catch(done);
    });

    it('links country to city', done => {
        req
            .put(`/countries/${russia._id}/cities/${kazan._id}`)
            .send(req.body)
            .then(res => {
                const city = res.body;
                kazan.countryId = russia._id;
                russia.cities.push(city);
                assert.deepEqual(city, kazan);
                done();
            })
            .catch(done);
    });

    it('includes country in city GET request', done => {
        req
            .get(`/cities/${kazan._id}`)
            .then(res => {
                const city = res.body;
                assert.equal(city.countryId, russia._id);
                done();
            })
            .catch(done);
    });

    it('includes city in country GET request', done => {
        req
            .get(`/countries/${russia._id}`)
            .then(res => {
                const country = res.body;
                assert.deepEqual(country, russia);
                done();
            })
            .catch(done);
    });

    it('DELETE city by id', done => {
        req
            .del(`/cities/${kazan._id}`)
            .then(res => {
                const city = res.body;
                assert.deepEqual(city, kazan);
                done();
            })
            .catch(done);
    });

    it('DELETE country by id', done => {
        req
            .del(`/countries/${russia._id}`)
            .then(res => {
                const country = res.body;
                assert.equal(country.name, russia.name);
                done();
            })
            .catch(done);
    });

    it('DELETE all cities', done => {
        req
            .del('/cities')
            .then(res => {
                expect(res).status(200);
                done();
            });
    });

    it('DELETE all countries', done => {
        req
            .del('/countries')
            .then(res => {
                expect(res).status(200);
                done();
            })
            .catch(done);
    });
});

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
chai.use(chaiHttp);
const dbConnection = require('../lib/mongoose');
const app = require('../lib/app');

describe('everything', () => {
    const req = chai.request(app);

    let russia = {
        name: 'Russia',
        provinces: 85
    };

    let georgia = {
        name: 'Georgia',
        provinces: 11
    };

    let turkmenistan = {
        name: 'Turkmenistan',
        provinces: 5
    };

    // it('GET empty array before POST', done => {
    //     req
    //         .get('/countries')
    //         .then(res => {
    //             assert.deepEqual(res.body, []);
    //             done();
    //         })
    //         .catch(done);
    // });

    const kazan = {
        name: 'Kazan',
        population: 1000000,
    };

    const yakutsk = {
        name: 'Yakutsk',
        population: 560000
    };

    const tbilisi = {
        name: 'Tbilisi',
        population: 900000
    };

    const ashgabat = {
        name: 'Ashgabat',
        population: 405000
    };

    it('POST a city', done => {
        req
            .post('/cities')
            .send(kazan)
            .then(res => {
                const city = res.body;
                assert.ok(city._id);
                assert.equal(city.name, kazan.name);
                kazan.__v = 0;
                kazan._id = city._id;
                done();
            })
            .catch(done);
    });

    it('POST a second city', done => {
        req
            .post('/cities')
            .send(yakutsk)
            .then(res => {
                const city = res.body;
                assert.ok(city._id);
                assert.equal(city.name, yakutsk.name);
                yakutsk.__v = 0;
                yakutsk._id = city._id;
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
                assert.ok(country._id);
                assert.equal(country.name, russia.name);
                russia.__v = 0;
                russia._id = country._id;
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
                russia.cities = city;
                assert.equal(city.name, kazan.name);
                done();
            })
            .catch(done);
    });

    it('GET by id', done => {
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

    it('links country to another city', done => {
        req
            .put(`/countries/${russia._id}/cities/${yakutsk._id}`)
            .send(req.body)
            .then(res => {
                const city = res.body;
                russia.cities.push(city);
                assert.equal(city.name, yakutsk.name);
                done();
            })
            .catch(done);
    });

    it('POST a second country', done => {
        req
            .post('/countries')
            .send(georgia)
            .then(res => {
                const country = res.body;
                assert.ok(country._id);
                assert.equal(country.name, georgia.name);
                georgia.__v = 0;
                georgia._id = country._id;
                done();
            })
            .catch(done);
    });

    it('POST a city for second country', done => {
        req
            .post('/cities')
            .send(tbilisi)
            .then(res => {
                const city = res.body;
                assert.ok(city._id);
                assert.equal(city.name, tbilisi.name);
                tbilisi.__v = 0;
                tbilisi._id = city._id;
                done();
            })
            .catch(done);
    });

    it('links second country to city', done => {
        req
            .put(`/countries/${georgia._id}/cities/${tbilisi._id}`)
            .send(req.body)
            .then(res => {
                const city = res.body;
                georgia.cities = city;
                assert.equal(city.name, tbilisi.name);
                done();
            })
            .catch(done);
    });

    it('POST a third country', done => {
        req
            .post('/countries')
            .send(turkmenistan)
            .then(res => {
                const country = res.body;
                assert.ok(country._id);
                assert.equal(country.name, turkmenistan.name);
                turkmenistan.__v = 0;
                turkmenistan._id = country._id;
                done();
            })
            .catch(done);
    });

    it('POST a city for third country', done => {
        req
            .post('/cities')
            .send(ashgabat)
            .then(res => {
                const city = res.body;
                assert.ok(city._id);
                assert.equal(city.name, ashgabat.name);
                ashgabat.__v = 0;
                ashgabat._id = city._id;
                done();
            })
            .catch(done);
    });

    it('links third country to city', done => {
        req
            .put(`/countries/${turkmenistan._id}/cities/${ashgabat._id}`)
            .send(req.body)
            .then(res => {
                const city = res.body;
                turkmenistan.cities = city;
                assert.equal(city.name, ashgabat.name);
                done();
            })
            .catch(done);
    });
});

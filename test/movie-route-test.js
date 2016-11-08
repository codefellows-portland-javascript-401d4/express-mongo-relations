const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use (chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe ('movie', () => {

    before( done => {
        const drop = () => connection.db.dropDatabase(done);
        if(connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    let token = '';

    before(done => {
        request
            .post('/auth/signup')
            .send({username: 'testuser', password: 'abc', roles: 'admin'})
            .then(res => assert.ok(token = res.body.token))
            .then(done, done);
    });

    const request = chai.request(app);

    const scarface = {
        title: 'Scarface',
        leadActor: 'Al Pacino',
        genre: 'Drama',
        academyAward: false
    };

    it ('Get All', done =>{
        request
            .get('/movies')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });
    it('Post', done => {
        request
            .post('/movies')
            .set('Authorization', `Bearer ${token}`)
            .send(scarface)
            .then(res => {
                const movie = res.body;
                assert.ok(movie._id);
                scarface.__v = 0;
                scarface._id = movie._id;
                scarface.createdAt = movie.createdAt;
                scarface.updatedAt = movie.updatedAt;
                done();
            })
            .catch(done);
    });
    it('Get all after Post', done => {
        request
            .get('/movies')
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.deepEqual(res.body, [scarface]);
                done();
            })
            .catch(done);
    });
    it ('get by id', done => {
        request
        .get(`/movies/${scarface._id}`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const movie = res.body;
            assert.deepEqual(movie, scarface);
            done();
        })
        .catch(done);
    });
    it('gets by genre', done => {
        request
        .get(`/movies?genre=Drama`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const movie = res.body;
            assert.deepEqual(movie, [scarface]);
            done();
        })
        .catch(done);
    });
    it('gets academy award winners', done =>{
        request
        .get(`/movies/aa/false`)
        .set('Authorization', `Bearer ${token}`)
        .then(res => {
            const movie = res.body;
            assert.deepEqual(movie, [scarface]);
            done();
        })
        .catch(done);
    });
    it('deletes', done => {
        request
            .delete(`/movies/${scarface._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then(res => {
                assert.isOk(res.body, 'deleted');
                done();
            })
            .catch(done);
    });
});
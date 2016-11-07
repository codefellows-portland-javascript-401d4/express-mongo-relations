const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use (chaiHttp);

const connection = require('../lib/mongoose');
const app = require('../lib/app');

describe ('movie', () => {

    before( done => {
        const Connected = 1;
        if (connection.readyState === Connected) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'movies';
            connection.db
                .listCollections({name})
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
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
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(done);
    });
    it('Post', done => {
        request
            .post('/movies')
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
            .then(res => {
                assert.deepEqual(res.body, [scarface]);
                done();
            })
            .catch(done);
    });
    it ('get by id', done => {
        request
        .get(`/movies/${scarface._id}`)
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
            .then(res => {
                assert.isOk(res.body, 'deleted');
                done();
            })
            .catch(done);
    });
});
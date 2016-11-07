const Movie = require('../lib/models/movie-model');
const assert = require('chai').assert;

describe('Movie Model', () => {

    it('validates title and leadActor', done => {
        const movie = new Movie({
            title: 'title',
            leadActor: 'leadActor'
        });

        movie.validate(err => {
            if(!err) done ();
            else done(err);
        });
    });

    it('title is required', done => {
        const movie = new Movie();
        movie.genre = 'western';

        movie.validate(err => {
            assert.isOk(err,'name should have been required');
            done();
        });
    });
    it('genre defaults to drama', done => {
        const movie = new Movie({
            title: 'Scarface'
        });

        movie.validate(err => {
            assert.isNotOk(err);
            assert.equal(movie.genre, 'drama');
            done();
        });
    });
});
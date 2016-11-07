'use strict';

const Painting = require('../lib/models/painting');
const assert = require('chai').assert;

describe ('Painting model', () => {
    it('validates Painting title and year', done => {
        const painting = new Painting({
            title: 'sugar sphinx',
            year: 1933
        });

        painting.validate(error => {
            if(!error) done();
            else done(error);
        });
    });

    it('ensures title is required', done => {
        const painting = new Painting();
        painting.year = 1933;

        painting.validate(error => {
            assert.isOk(error, 'title is required');
            done();
        });
    });
});

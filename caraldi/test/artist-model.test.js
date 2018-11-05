'use strict';

const Artist = require('../lib/models/artist');
const assert = require('chai').assert;

describe ('Artist model', () => {
   
    it('validates Artist name and birthdate', done => {
        const artist = new Artist({
            name: 'salvador dalí',
            birthdate: 'May 11th'
        });

        artist.validate(error => {
            if(!error) done();
            else done(error);
        });
    });

    it('ensures name is required', done => {
        const artist = new Artist();
        artist.birthdate = 'May 11th';

        artist.validate(error => {
            assert.isOk(error, 'name is required');
            done();
        });
    });
});

'use strict';

const Character = require('../lib/models/character');
const assert = require('chai').assert;

describe('Character model', () => {

    it('validates with name', done => {
        const character = new Character({
            name: 'Geralt'
        });

        character.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const character = new Character({});

        character.validate(err => {
            assert.isOk(err, 'Name should have been required');
            done();
        });
    });
});
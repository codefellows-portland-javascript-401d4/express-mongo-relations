'use strict';

const Game = require('../lib/models/game');
const assert = require('chai').assert;

describe('Game model', () => {

    it('validates with name', done => {
        const game = new Game({
            title: 'Skyrim'
        });

        game.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('requires name', done => {
        const game = new Game({});

        game.validate(err => {
            assert.isOk(err, 'Name should have been required');
            done();
        });
    });
});
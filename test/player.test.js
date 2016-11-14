const Player = require('../lib/models/player');
const assert = require('chai').assert;

describe('Player model', () => {

    it('validates with playerName', done => {
        const player = new Player ({
            playerName: 'playerName'
        });

        player.validate(err => {
            if(!err) done();
            else done(err);
        });
    });

    it('playerName is required', done => {
        const player = new Player ();
        player.position = 'QB';

        player.validate(err => {
            assert.isOk(err, 'playerName should have been required');
            done();
        });
    });

    it('position must be a string', done => {
        const player = new Player();
        // player.playerName = 'playerName';
        player.position = null;


        player.validate(err => {
            // console.log(err);
            assert.isOk(err, 'expected error - incorrect data type on position');
            done();
        });
    });



});

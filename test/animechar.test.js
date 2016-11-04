const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const animeChar = require('../lib/models/animechar');
const animeShow = require('../lib/models/animeshow');

describe('unit testing animechar model', () => {
    it('verifies that uploading values returns a new document on mongoose', done => {
        const edward = new animeChar({
            name: 'Edward Elric',
            age: 16,
            power: 'Alchemy',
            attackpower: 87,
            hair_color: 'blonde',
        });

        edward.validate(err => {
            if(err) done(err);
            else {
                console.log(edward);
                done();
            };
        });
    });

    it('verifies that uploading something to show when initiated returns an error', done => {
        const boogiepop = new animeChar({
            name: 'Boogiepop Phantom',
            age: 16,
            power: 'Ether',
            attackpower: 150,
            hair_color: 'brown',
            show: 'Boogiepop Phantom'
        });

        boogiepop.validate(err => {
            if (err) {
                assert.isOk(err, 'this should fail for sure as a a failed for value at path');
                done();
            } else {
                done('this should fail');
            }
        });
    });

    it('verifies that if a show produces an id, we can populate show and have validation pass', done => {
        const SEP = new animeShow({
            showname: 'Serial Experiments Lain',
            airdate: new Date('1998-07-12'),
            genre: 'sci-fi'
        });

        const lain = new animeChar({
            name: 'Lain Iwakura',
            age: 14,
            power: 'The Wired',
            attackpower: 9999,
            hair_color: 'brown',
            show: SEP._id
        });

        lain.validate(err => {
            if (err) done(err);
            else done();
        })
    });
});

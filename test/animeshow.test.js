const chai = require('chai');
const assert = chai.assert;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const animeChar = require('../lib/models/animechar');
const animeShow = require('../lib/models/animeshow');

describe('unit tests the anime show model', () => {
    it('verifies that the anime show model is working', done => {
        const trigun = new animeShow({
            showname: 'Trigun',
            airdate: '1998-04-01',
            genre: 'action-comedy',
        });
        trigun.validate(err => {
            if (err) done(err);
            else done();
        });
    });

    it('verifies that you can have a document from another collection in the characters array', () => {
        const cromartie = new animeShow({
            showname: 'CroMartie HighSchool',
            airdate: '2003-10-03',
            genre: 'comedy',
        });

        const freddie = new animeChar({
            name: 'Freddie',
            age: 39,
            power: 'Sick vocals',
            attackpower: 10,
            hair_color: 'dark brown',
            show: cromartie._id
        });

        cromartie.characters.push(freddie);
        assert.deepEqual(cromartie.characters[0], freddie);
    });
});
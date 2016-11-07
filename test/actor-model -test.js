const Actor = require('../lib/models/actor-model');
const assert = require('chai').assert;

describe('Actor Model', () => {

    it('validates name and gender', done => {
        const actor = new Actor({
            name: 'name',
            gender: 'male'
        });

        actor.validate(err => {
            if(!err) done ();
            else done(err);
        });
    });

    it('name is required', done => {
        const actor = new Actor();
        actor.gender = 'male';

        actor.validate(err => {
            assert.isOk(err,'name should have been required');
            done();
        });
    });
});
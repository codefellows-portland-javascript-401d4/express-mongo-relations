'use strict';

const Movement = require('../lib/models/movement');
const assert = require('chai').assert;

describe ('Movement model', () => {
   
    it('validates Movement name, start and end', done => {
        const movement = new Movement({
            name: 'surrealism',
            start: 1924,
            end: 1966
        });

        movement.validate(error => {
            if(!error) done();
            else done(error);
        });
    });

    it('ensures name is required', done => {
        const movement = new Movement();
        movement.start = 1924;

        movement.validate(error => {
            assert.isOk(error, 'name is required');
            done();
        });
    });
});

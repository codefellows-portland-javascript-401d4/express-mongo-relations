'use strict';

const Painter = require('../lib/models/painter');
const assert = require('chai').assert;

describe ('Painter model', () => {
    it('validates Painter name and style', done => {
        const painter = new Painter({
            name: 'salvador dalí',
            style: 'surrealism'
        });

        painter.validate(error => {
            if(!error) done();
            else done(error);
        });
    });

    it('ensures name is required', done => {
        const painter = new Painter();
        painter.style = 'surrealism';

        painter.validate(error => {
            assert.isOk(error, 'name is required');
            done();
        });
    });
});

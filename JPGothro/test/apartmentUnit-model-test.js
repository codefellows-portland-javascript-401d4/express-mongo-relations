// Testing the Apartment Unit Model
const ApartmentUnit = require('../lib/models/apartmentUnit');
const assert = require('chai').assert;

describe('Validate ApartmentUnit model', () => {
    it('Validation with all properties', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Apartment',
            location: 'random floor',
            nbrbdrms: 2,
            nbrbaths: 2,
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation of defaulted values', done => {
        const newApt = new ApartmentUnit({
            name: 'New Apt',
            totalsize: 900,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        newApt.validate(err => {
            if (!err) done();
            else done(err);
        });
    });

    it('Validation with no name', done => {
        const aptUnit = new ApartmentUnit({
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 1,
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'name should be required');
            done();
        });
    });

    it('Validation with no total size', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 1,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'total size should be required');
            done();
        });
    });

    it('Validation with non-numeric total size', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 1,
            totalsize: 'not a number',
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'total size should be numeric');
            done();
        });
    });

    it('Validation with sub-minimum total size', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 1,
            totalsize: 499,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'total size should be 500 or greater');
            done();
        });
    });

    it('Validation with non-numeric number of bedrooms', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 'non-numeric',
            nbrbaths: 1,
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'nbrbdrms should be numeric');
            done();
        });
    });

    it('Validation with sub-minimum number of bedrooms', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: -1,
            nbrbaths: 1,
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'nbrbdrms should be zero or more');
            done();
        });
    });

    it('Validation with non-numeric number of bathrooms', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 'non-numeric',
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'nbrbaths should be numeric');
            done();
        });
    });

    it('Validation with sub-minimum number of bathrooms', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 0,
            totalsize: 1000,
            bldgId: '581d1eee6823e51ab3d78fbe'
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'nbrbaths should be greater than zero');
            done();
        });
    });

    it('Validation of building Id', done => {
        const aptUnit = new ApartmentUnit({
            name: 'Test Unit',
            location: 'random floor',
            nbrbdrms: 1,
            nbrbaths: 0,
            totalsize: 1000
        });

        aptUnit.validate(err => {
            assert.isOk(err, 'Building Id is required');
            done();
        });
    });

});

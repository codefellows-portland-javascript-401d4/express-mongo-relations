const Book = require('../lib/models/books.js');
const Character = require('../lib/models/bookchar');
const assert = require('chai').assert;

describe('Book model', () => {

    it('validates fields', done => {
        const book = new Book({
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            genre: 'Fantasy',
            nbrBooks: 7
        })

        book.validate(err => {
            if(!err) done();
            else done(err);
        })
    })

    it('requires fields', done => {
        const book = new Book()
        book.title = 'dresden';

        book.validate(err => {
            assert.isOk(err, 'name should have been required');
            done();
        })
    })

    it('nbrBooks must be a number', done => {
        const book = new Book({
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            genre: 'Fantasy',
            nbrBooks: 'bobby'
        })

        book.validate(err => {
            assert.isOk(err, 'expected error on nbrBooks data type');
            done();
        })
    })

    it('nbrBooks must be a postive number', done => {
        const book = new Book({
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            genre: 'Fantasy',
            nbrBooks: -12
        })

        book.validate(err => {
            assert.isOk(err, 'expected error on nbrBooks data type');
            done();
        })
    })

    it('genre has a default field', done => {
        const book = new Book({
            title: 'Harry Potter and the Chamber of Secrets',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            nbrBooks: 12
        })

        book.validate(err => {
            assert.isNotOk(err);
            assert.equal(book.genre, 'Science Fiction');
            done();
        })
    })

})

describe('Character model', () => {

    it('validates fields', done => {
        const character = new Character({
            name: 'Harry Potter',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            location: 'London',
            occupation: 'Student',
            type: 'Wizard',
            nbrBooks: 7
    })

        character.validate(err => {
            if(!err) done();
            else done(err);
        })
    })

    it('requires fields', done => {
        const character = new Character()
        character.title = 'dresden';

        character.validate(err => {
            assert.isOk(err, 'name should have been required');
            done();
        })
    })

    it('nbrBooks must be a number', done => {
        const character = new Character({
            name: 'Harry Potter',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            location: 'London',
            occupation: 'Student',
            type: 'Wizard',
            nbrBooks: 'seven'
        })

        character.validate(err => {
            assert.isOk(err, 'expected error on nbrBooks data type');
            done();
        })
    })

    it('nbrBooks must be a postive number', done => {
        const character = new Character({
            name: 'Harry Potter',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            location: 'London',
            occupation: 'Student',
            type: 'Wizard',
            nbrBooks: -7
        })

        character.validate(err => {
            assert.isOk(err, 'expected error on nbrBooks data type');
            done();
        })
    })

    it('type has a default field', done => {
        const character = new Character({
            name: 'Harry Potter',
            author: 'J.K. Rowling',
            series: 'Harry Potter Series',
            location: 'London',
            occupation: 'Student',
            nbrBooks: 7
        })
        
        character.validate(err => {
            assert.isNotOk(err);
            assert.equal(character.type, 'Human');
            done();
        })
    })

})
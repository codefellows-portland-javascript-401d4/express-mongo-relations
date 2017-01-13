const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );

const connection = require( './setup-mongoose-test' );

const app = require( '../lib/app' );

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on( 'open', dropCollection );

        function dropCollection (){
            const name = 'booksdb';
            connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
                    if(!collinfo) return done();
                    connection.db.dropCollection(name, done);
                })
        }
    })

describe( 'books connection', () => {

    
    const request = chai.request (app); 

    const potter = {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
        series: 'Harry Potter Series',
        genre: 'Fantasy',
        nbrBooks: 7
    }

    it( '/POST books', done => {
        request 
            .post('/books')
            .send( potter )
            .then( res => {
                const book = res.body;
                assert.ok( book._id );
                potter.__v = 0;
                potter._id = book._id;
                done();
            })
            .catch( done );
    });

    it( '/GET all books', done => {
        request 
            .get( '/books' )
            .then( res => {
                assert.ok( res.body );
                done();
            })
            .catch( done );
    })

    it( '/PUT books', done => {
        request
            .put( `/books/${potter._id}` )
            .send( { title: 'Chamber of Secrets',
                    author: 'J.K. Rowling',
                    series: 'Harry Potter Series',
                    genre: 'Fantasy',
                    nbrBooks: 7 })
            .then ( res => {
                const newBook = res.body;
                assert.equal(newBook.title, 'Chamber of Secrets')
                done();
            })
            .catch( done );
    })

    it( '/GET by id books', done => {
        request
            .get( `/books/${potter._id}` )
            .then( res => {
                const book = res.body;
                assert.deepEqual(book, potter);
                done();
            })
            .catch( done );
    })


    it( '/DELETE books', done => {
        request
            .del( `/books/${potter._id}` )
            .then( res => {
                const book = res.body;
                assert.ok(book, 'deleted');
                done();
            })
            .catch( done );
    })

});

describe( 'character connection', () => {

    const request = chai.request (app); 

    const potter = {
        name: 'Harry Potter',
        author: 'J.K. Rowling',
        series: 'Harry Potter Series',
        location: 'London',
        occupation: 'Student',
        type: 'Wizard',
        nbrBooks: 7
    }

    it( '/POST char', done => {
        request 
            .post('/characters')
            .send( potter )
            .then( res => {
                const character = res.body;
                assert.ok( character._id );
                potter.__v = 0;
                potter._id = character._id;
                done();
            })
            .catch( done );
    });

    it( '/GET all char', done => {
        request 
            .get( '/characters' )
            .then( res => {
                assert.ok( res.body );
                done();
            })
            .catch( done );
    })

    it( '/PUT char', done => {
        request
            .put( `/characters/${potter._id}` )
            .send( {
                    name: 'Potter',
                    author: 'J.K. Rowling',
                    series: 'Harry Potter Series',
                    location: 'London',
                    occupation: 'Student',
                    type: 'Wizard',
                    nbrBooks: 7
                })
            .then ( res => {
                const newCharacter = res.body;
                assert.equal(newCharacter.name, 'Potter')
                done();
            })
            .catch( done );
    })

    it( '/GET by id char', done => {
        request
            .get( `/characters/${potter._id}` )
            .then( res => {
                const character = res.body;
                assert.deepEqual(character, potter);
                done();
            })
            .catch( done );
    })

    it( '/DELETE char', done => {
        request
            .del( `/characters/${potter._id}` )
            .then( res => {
                const character = res.body;
                assert.ok(character, 'deleted');
                done();
            })
            .catch( done );
    })

});

after( done => {
    connection.close(done) }
); 
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose');

const app = require( '../app' );

describe( 'coach', () => {
    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'coaches';
            connection.db
                .listCollections({ name })
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);
    const pete = {
        coachName: 'Pete Carroll'
    };

    it( 'GET all', done => {
        request
            .get( '/api/coaches' )
            .then( res => {
                assert.deepEqual( res.body, [] );
                done();
            })
            .catch( done );
    });

    it( 'POST', done => {
        request
            .post( '/api/coaches' )
            .send( pete )
            .then( res => {
                const coach = res.body;
                assert.ok( coach._id);
                pete.__v = 0;
                pete._id = coach._id;
                done();
            })
            .catch( done );
    });

    it( 'GET by id', done => {
        request
            .get(`/api/coaches/${pete._id}` )
            .then( res => {
                const coach = res.body;
                assert.deepEqual( coach, pete );
                done();
            })
            .catch( done );
    });
});
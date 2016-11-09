const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup-mongoose');

const app = require( '../app' );

describe( 'team', () => {
    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const name = 'teams';
            connection.db
                .listCollections({ name })
                .next((err, collinfo) => {
                    if (!collinfo) return done();
                    connection.db.dropCollection(name, done);
                });
        }
    });

    const request = chai.request(app);

    const seahawks = {
        name: 'Seahawks'
    };

    it( 'GET all', done => {
        request
            .get( '/api/teams' )
            .then( res => {
                assert.deepEqual( res.body, [] );
                done();
            })
            .catch( done );
    });

    it( 'POST', done => {
        request
            .post( '/api/teams' )
            .send( seahawks )
            .then( res => {
                const team = res.body;
                assert.ok( team._id);
                seahawks.__v = 0;
                seahawks._id = team._id;
                done();
            })
            .catch( done );
    });

    it( 'GET by id', done => {
        request
            .get(`/api/teams/${seahawks._id}`)
            .then( res => {
                const team = res.body;
                assert.deepEqual( team, seahawks );
                done();
            })
            .catch( done );
    });
});
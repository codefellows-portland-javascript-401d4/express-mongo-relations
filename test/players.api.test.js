const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup_mongoose');

const app = require( '../lib/app' );

describe( 'player', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'players';
            connection.db
						.listCollections({ name })
						.next( (err, collinfo) => {
    if (!collinfo) return done();
    connection.db.dropCollection(name, done);
});
        }
    });

    const request = chai.request(app);

    const antonio = {
        playerName: 'Antonio Brown'
    };

    it( '/GET all', done => {
        request
				.get( '/api/players' )
				.then( res => {
    assert.deepEqual( res.body, [] );
    done();
})
			.catch( done );
    });

    it( '/POST', done => {
        request
				.post( '/api/players' )
				.send( antonio )
				.then( res => {
    const player = res.body;
    assert.ok( player._id );
    antonio.__v = 0;
    antonio._id = player._id;
    done();
})
			.catch( done );

    });

    it( '/GET by id', done => {
        request
    .get( `/api/players/${antonio._id}` )
			.then( res => {
    const player = res.body;
    assert.deepEqual( player, antonio );
    done();
})
			.catch( done );
    });

});

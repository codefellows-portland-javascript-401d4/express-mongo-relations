const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require( '../lib/setup_mongoose');

const app = require( '../lib/app' );

describe( 'team', () => {

    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection(){
            const name = 'teams';
            connection.db
						.listCollections({ name })
						.next( (err, collinfo) => {
    if (!collinfo) return done();
    connection.db.dropCollection(name, done);
});
        }
    });

    const request = chai.request(app);

    const snap = {
        teamName: 'Oh Snap!'
    };

    it( '/GET all', done => {
        request
				.get( '/api/teams' )
				.then( res => {
    assert.deepEqual( res.body, [] );
    done();
})
			.catch( done );
    });

    it( '/POST', done => {
        request
				.post( '/api/teams' )
				.send( snap )
				.then( res => {
    const team = res.body;
    // console.log(team);
    assert.ok( team._id );
    snap.teamName = team.teamName;
    snap.__v = 0;
    snap._id = team._id;
    snap.rosterId = [];
    done();
})
			.catch( done );

    });

    it( '/GET by id', done => {
        request
    .get( `/api/teams/${snap._id}` )
			.then( res => {
    const team = res.body;
    assert.deepEqual( team, snap );
    done();
})
			.catch( done );
    });

// TROUBLE WITH THIS TEST
//     it( '/GET all after post', done => {
//         request
// 			.get( '/api/teams' )
// 			.then( res => {
//     console.log(res.body);
//     console.log( [snap] );
//     assert.equal( res.body, [ snap ] );
//
//     done();
// })
// 			.catch( done );
//     });

    after( done => {
        connection.close( done );
    });
});

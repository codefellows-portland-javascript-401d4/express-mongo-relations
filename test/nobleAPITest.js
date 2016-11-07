const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );

const connection = require( '../lib/setupMongooseTest' );
const app = require( '../lib/app.js' );

describe( 'noble', () => {

	before( done => {
		const CONNECTED = 1;
		if (connection.readyState === CONNECTED) dropCollection();
		else connection.on('open', dropCollection);

		function dropCollection(){
			const name = 'houses';
			connection.db
                .listCollections({ name })
                .next( (err, collinfo) => {
	if (!collinfo) return done();
	connection.db.dropCollection(name, done);
});
		}
	});

	const request = chai.request( app );

	const stark1 = {
		name: 'Stark',
		sigil: 'Wolf',
		words: 'Winter is Coming',
		seat: 'Winterfell',
		members: []
	};

	const greyjoy1 = {
		name: 'Greyjoy',
		sigil: 'Kraken',
		words: 'We Do Not Sow',
		seat: 'Pyke',
		members: []
	};

	const jon = {
		name: 'Jon',
		house: 'Stark',
		age: 18,
		female: false,
		alive: false
  };

	const asha = {
		name: 'Asha',
		house: 'Greyjoy',
		age: 22,
		female: true,
		alive: true
  };


	it( 'does not contain houses until they are aded', done => {
		request
			.get( '/api/westeros/houses' )
			.then( res => {
				assert.deepEqual( res.body, [] );
				done();
			})
			.catch( done );
	});

	it( 'adds houses', done => {
		request
			.post( '/api/westeros/houses' )
			.send(stark1)
			.then( res => {
				const house = res.body;
				assert.ok( house._id );
				stark1.__v = 0;
				stark1._id = house._id;
				done();
			})
			.catch( done );

	});

	it( 'adds houses more houses', done => {
		request
			.post( '/api/westeros/houses' )
			.send(greyjoy1)
			.then( res => {
				const house = res.body;
				assert.ok( house._id );
				greyjoy1.__v = 0;
				greyjoy1._id = house._id;
				done();
			})
			.catch( done );

	});


	it( '/GETs houses by name', done => {
		request
			.get( '/api/westeros/houses/Stark' )
			.then( res => {
				assert.deepEqual( res.body, [stark1] );
				done();
			})
			.catch( done );
	});

	it( '/GETs all houses', done => {
		request
			.get( '/api/westeros/houses' )
			.then( res => {
				assert.equal( res.body.length, 2 );
				done();
			})
			.catch( done );
	});

// 	it( 'adds an omnivore', done => {
// 		request
// 			.post( '/api/animals' )
// 			.send(brownBear)
// 			.then( res => {
// 				assert.ok( res.body._id );
// 				brownBear.__v = 0;
// 				brownBear._id = res.body._id;
// 				done();
// 			})
// 			.catch( done );
// 	});

// 	it( '/GET where type is omnivore', done => {
// 		request
//             .get('/api/animals/omnivores')
//             .then(res => {
// 	assert.deepEqual(res.body, [brownBear]);
// 	done();
// })
// 			.catch( done );	
// 	});

// 	it( '/GETs animals by id', done => {
// 		request
// 			.get( '/api/animals/'+brownBear._id)
// 			.then( res => {
// 				assert.deepEqual( res.body, [brownBear] );
// 				done();
// 			})
// 			.catch( done );
// 	});

	after( done=> {
		connection.close(done);
	});
});

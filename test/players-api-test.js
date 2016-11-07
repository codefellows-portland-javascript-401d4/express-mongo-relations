//teams-api parallels players-api (for now) so separate testing not needed

const chai = require( 'chai' );
const chaiHttp = require( 'chai-http' );
const assert = chai.assert;
chai.use( chaiHttp );

// start the db, and store connection, 
// so we can clear db
const connection = require( '../lib/setup-mongoose' );

const app = require( '../lib/app' );

describe( 'player api', () => {

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

  const request = chai.request( app );

  const healy = {
    name: 'Ryon Healy',
    position: '3B',
    homers: 13
  };

  //he will be used to prove homer leader sort at end
  const bryant =  {
    name: 'Kris Bryant',
    position: '1B',
    homers: 39
  };

  const athletics = {
    team: 'Athletics',
    league: 'American',
    division: 'West',
    wins: 69
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
			.send( healy )
			.then( res => {
  const player = res.body;
  assert.ok( player._id );
  healy._id = player._id;
  done();
})
			.catch( done );

  });

  it( '/GET all after post', done => {
    request
			.get( '/api/players' )
			.then( res => {
  assert.deepEqual( res.body, [ healy ] );
  done();
})
			.catch( done );
  });

  it( '/GET by id', done => {
    request
			.get( `/api/players/${healy._id}` )
			.then( res => {
  const player = res.body;
  assert.deepEqual( player, healy );
  done();
})
			.catch( done );
  });

  it( 'add an additional player', done => {
    request
			.post( '/api/players' )
			.send(bryant)
			.then( res => {
  assert.ok( res.body._id );
  done();
})
			.catch( done );
  });

  it( '/GETs sorted homer leaders after 2nd player (Bryant) with more HRs added earlier', done => {
    request
			.get( '/api/players/hrLeaders' )
			.then( res => {

  assert.equal( res.body[0].name, 'Kris Bryant' );
  done();
})
			.catch( done );
  });

  it( '/POST adding team for next test', done => {
    request
			.post( '/api/teams' )
			.send( athletics )
			.then( res => {
  const team = res.body;
  assert.ok( team._id );
  athletics.__v = 0;
  athletics._id = team._id;
  done();
})
			.catch( done );

  });

  it ('PUTs joins team ID into player data', done => {
    testPath = '/api/teams/' + athletics._id + '/players/' + healy._id;
    request
			.put( testPath )
			.then( res => {
  assert.equal( res.body.teamId, athletics._id); 
  done();
})
			.catch( done );
  });

});


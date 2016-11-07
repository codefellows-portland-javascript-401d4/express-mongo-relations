const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe('RESTful API for ships resource', () => {

  before(done => {
    let CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      let name = 'ships';
      connection.db
        .listCollections({ name })
        .next((err, info) => {
          if (!info) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);
  const ship1 = {
    name: 'Executor',
    type: 'Super Star Destroyer',
    lengthMeters: 19000
  };
  const ship2 = {
    name: 'Millenium Falcon',
    type: 'Smuggling Vessel',
    lengthMeters: 34.75,
    __v: 0
  };

  it('Starts with empty collection', done => {
    request
      .get('/api/ships')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('Adds a ship to the collection', done => {
    request
      .post('/api/ships')
      .send(ship1)
      .then(res => {
        const resShip = res.body;
        assert.ok(resShip._id);
        ship1._id = resShip._id;
        ship1.__v = 0;
        done();
      })
      .catch(done);
  });

  it('Gets ship by Id', done => {
    request
      .get(`/api/ships/${ship1._id}`)
      .then(res => {
        const resShip = res.body;
        assert.deepEqual(resShip, ship1);
        done();
      })
      .catch(done);
  });

  it('Gets all ships', done => {
    request
      .get('/api/ships')
      .then(res => {
        assert.deepEqual(res.body, [ ship1 ]);
        done();
      })
      .catch(done);
  });

  it('Updates a ship with PUT', done => {
    request
      .put(`/api/ships/${ship1._id}`)
      .send(ship2)
      .then(res => {
        ship2._id = ship1._id;
        assert.deepEqual(res.body, ship2);
        done();
      })
      .catch(done);
  });
  
});

describe('RESTful API for characters resource', () => {

  before(done => {
    let CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      let name = 'characters';
      connection.db
        .listCollections({ name })
        .next((err, info) => {
          if (!info) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);
  const char1 = {
    name: 'Darth Vader',
    forceUser: false,
    shipId: '5820f965f4d001dbbfa60e61'
  };
  const char2 = {
    name: 'Darth Vader',
    forceUser: true,
    shipId: '5820f965f4d001dbbfa60e61',
    __v: 0
  };

  it('Starts with empty collection', done => {
    request
      .get('/api/characters')
      .then(res => {
        assert.deepEqual(res.body, []);
        done();
      })
      .catch(done);
  });

  it('Adds a character to the collection', done => {
    request
      .post('/api/characters')
      .send(char1)
      .then(res => {
        const resChar = res.body;
        assert.ok(resChar._id);
        char1._id = resChar._id;
        char1.__v = 0;
        done();
      })
      .catch(done);
  });

  it('Gets character by Id', done => {
    request
      .get(`/api/characters/${char1._id}`)
      .then(res => {
        const resChar = res.body;
        assert.deepEqual(resChar, char1);
        done();
      })
      .catch(done);
  });

  it('Gets all characters', done => {
    request
      .get('/api/characters')
      .then(res => {
        assert.deepEqual(res.body, [ char1 ]);
        done();
      })
      .catch(done);
  });

  it('Updates a character with PUT', done => {
    request
      .put(`/api/characters/${char._id}`)
      .send(char2)
      .then(res => {
        char2._id = char1._id;
        assert.deepEqual(res.body, char2);
        done();
      })
      .catch(done);
  });

  after(done => {
    connection.close(done);
  });
  
});
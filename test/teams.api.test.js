const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe ('teams API E2E testing', () => {
  const test_teams = [
    {
      team: 'HTC',
      sponsor: 'HTC',
      country: 'US'
    },
    {
      team: 'T-Mobile',
      sponsor: 'T-Mobile',
      country: 'Germany'
    },
    {
      team: 'Leopard-Trek',
      sponsor: 'Trek Bicycles',
      country: 'Lichtenstein',
    },
    {
      team: 'Euskaltel Euskadi',
      sponsor: 'Euskaltel',
      country: 'Spain'
    }
  ];

  before(function(done) {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'teams';
      connection.db
        .listCollections({ name })
        .next((err, collInfo) => {
          if (!collInfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  it ('GET / should return empty array', () => {
    request 
      .get('/api/teams')
      .then((res) => {
        expect(res.body).to.deep.equal([]);
      });
  });

  it ('POSTs a bunch of teams', (done) => {
    Promise.all(
      test_teams.map((team) => { return request.post('/api/teams').send(team); })
    )
    .then((results) => {
      results.forEach((item, index) => {
        test_teams[index]._id = item.body._id;
        test_teams[index].__v = 0;
      });
      done();
    })
    .catch(done);
  });

  it ('GET /:id returns the correct team', (done) => {

    request
      .get(`/api/teams/${test_teams[0]._id}`)
      .then((res) => {
        expect(res.body).to.deep.equal(test_teams[0]);
        done();
      })
      .catch(done);
  });

  it ('GET / returns all teams after POST', (done) => {

    request
      .get('/api/teams/')
      .then((res) => {
        expect(res.body).to.deep.equal(test_teams);
        done();
      })
      .catch(done);
  });

  it ('updates specific team info given id', (done) => {
    request
      .put(`/api/teams/${test_teams[0]._id}`)
      .send({ sponsor: 'Columbia Sportswear' })
      .then(() => {
        request
          .get(`/api/teams/${test_teams[0]._id}`)
          .then((res) => {
            expect(res.body.sponsor).to.equal('Columbia Sportswear');
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it ('deletes specific team given id', (done) => {
    request
      .delete(`/api/teams/${test_teams[1]._id}`)
      .then(() => {
        request
          .get(`/api/riders/${test_teams[1]._id}`)
          .then((res) => { // eslint-disable-line no-unused-vars
            done('Should have generated a 404 error');
          })
          .catch((err) => {
            expect(err.response.status).to.equal(404);
            done();
          });
      })
      .catch(done);
  });
  
  after((done) => {
    connection.close(done);
  });

});
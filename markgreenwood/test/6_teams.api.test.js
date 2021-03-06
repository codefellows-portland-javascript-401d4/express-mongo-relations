const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const connection = require('../lib/setup-mongoose');
const app = require('../lib/app');

describe ('teams API E2E testing', () => {
  let test_riders;
  const test_teams = [
    {
      team: 'HTC-Highroad',
      sponsor: 'HTC',
      country: 'US'
    },
    {
      team: 'T-Mobile',
      sponsor: 'T-Mobile',
      country: 'Germany'
    },
    {
      team: 'Trek',
      sponsor: 'Trek Bicycles',
      country: 'US',
    },
    {
      team: 'Euskaltel Euskadi',
      sponsor: 'Euskaltel',
      country: 'Spain'
    },
    {
      team: 'Sky',
      sponsor: 'Sky UK Ltd',
      country: 'UK'
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

  it ('loads test riders from riders collection', (done) => {
    request
      .get('/api/riders')
      .then((res) => {
        test_riders = res.body;
        done();
      })
      .catch(done);
  });

  it ('GET / should return empty array', (done) => {
    request 
      .get('/api/teams')
      .then((res) => {
        expect(res.body).to.deep.equal([]);
        done();
      })
      .catch(done);
  });

  const testuser = {
    username: 'adminuser',
    password: 'multipass'
  };

  let token = ''; // eslint-disable-line no-unused-vars

  it ('signs in an admin test user', (done) => {
    request
      .post('/api/auth/signin')
      .send(testuser)
      .then((res) => {
        token = res.body.token;
        done();
      })
      .catch(done);
  });

  it ('POSTs a bunch of teams', (done) => {
    Promise.all(
      test_teams.map((team) => { 
        return request.post('/api/teams').set('Authorization', `Bearer ${token}`).send(team);
      })
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

  it ('PUT /api/teams/:team_id/rider/:rider_id assigns rider "rider_id" to team "team_id"', (done) => {

    const assignments = [
      [ 0, 0 ],
      [ 1, 2 ],
      [ 2, 0 ],
      [ 3, 4 ],
      [ 4, 3 ],
      [ 5, 4 ],
      [ 6, 0 ]
    ];

    Promise.all(
      assignments.map((assignment) => {
        return request
          .put(`/api/teams/${test_teams[assignment[1]]._id}/rider/${test_riders[assignment[0]]._id}`)
          .set('Authorization', `Bearer ${token}`);
      })
    )
      .then(() => {
        request
          .get(`/api/riders/${test_riders[0]._id}`)
          .then((res) => {
            expect(res.body.teamId._id).to.equal(test_teams[0]._id);
            done();
          })
          .catch(done);
      })
      .catch(done);

  });

  it ('GET /:team_id/riders lists the specified team along with the riders on it', (done) => {
  
    request
      .get(`/api/teams/${test_teams[0]._id}/riders`)
      .then((res) => {
        const members = res.body.riders;
        expect(members.length).to.equal(3);
        expect(members.map((r) => { return r.name; })).to.deep.equal([
          'George Hincapie',
          'Mark Cavendish',
          'Mark Renshaw'
        ]);
        done();
      })
      .catch(done);
  });

  it ('updates specific team info given id', (done) => {
    request
      .put(`/api/teams/${test_teams[0]._id}`)
      .set('Authorization', `Bearer ${token}`)
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

  const superuser = {
    username: 'superuser',
    password: 'supersecretpassword'
  };

  it ('signs in a super user', (done) => {
    request
      .post('/api/auth/signin')
      .send(superuser)
      .then((res) => {
        token = res.body.token;
        done();
      })
      .catch(done);
  });

  it ('deletes specific team given id', (done) => {
    request
      .delete(`/api/teams/${test_teams[1]._id}`)
      .set('Authorization', `Bearer ${token}`)
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
  
  it ('GET /api/teams/:team_id/riders returns team info with a list of riders on the team', (done) => {
    request
      .get(`/api/teams/${test_teams[0]._id}/riders`)
      .then((res) => {
        const team = res.body;
        expect(team.riders.length).to.equal(3);
        done();
      })
      .catch(done);
  });

  it ('GET /api/riders/:rider_id returns a rider with his associated team name', (done) => {
    request
      .get(`/api/riders/${test_riders[0]._id}`)
      .then((res) => {
        const rider = res.body;
        expect(rider.teamId.team).to.equal('HTC-Highroad');
        done();
      })
      .catch(done);
  });
  
  // after((done) => {
  //   connection.close(done);
  // });

});
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//need connection to db
const connection = require('../lib/set-mongoose');

const app = require('../lib/app');

describe('the tag model', () => {
  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'tags';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if (err) done(err);
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const tagTested =
    {
      name: 'tag for testing',
      description: 'test and learn',
      heat: 'warm'
    };

  it('navigates to POST and stashes a new tag', (done) => {
    request
      .post('/tags/tagTested')
      .send(tagTested)
      .then((res) => {
        const tag = res.body;
        expect(tag.data._id).to.be.ok;
        tagTested.__v = 0;
        tagTested._id = tag.data._id;
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all tags', (done) => {
    request
      .get('/')
      .then((res) => {
        expect(res.body).to.deep.equal({});
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a tag by id', (done) => {
    request
      .get(`/tags/${tagTested._id}`)
      .then((res) => {
        const tag = res.body;
        expect(tag.data.description).to.deep.equal('test and learn');
        done();
      })
      .catch(done);
  });

  it('stashes a tag with no heat', (done) => {
    request
      .post('/tags/:id')
      .send({name: 'empty tag test', description: 'just for testing', heat: ''})
      .then((res) => {
        expect(res.body.data._id).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('finds tags with a heat valued warm', (done) => {
    request
      .get('/tags/search/heat/warm')
      .then((res) => {
        expect(res.body.data[0].heat).to.include('warm');
        done();
      })
      .catch(done);
  });

  it('updates a tag in the database', (done) => {
    request
      .put(`/tags/${tagTested._id}`)
      .send({name: 'modified tag for testing', description: 'modified tag text', heat: 'warm'})
      .then((res) => {
        expect(res.body.data.description).to.deep.equal('modified tag text');
        done();
      })
      .catch(done);
  });

  it('deletes a tag from the database', (done) => {
    request
      .delete(`/tags/${tagTested._id}`)
      .then(() => {
        request
          .get(`/tags/${tagTested._id}`)
          .then((res) => {
            expect(res.body.data).to.deep.equal(undefined);
          });
        done();
      })
      .catch(done);
  });

});
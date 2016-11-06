const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

//need to connect to db
const connection = require('../lib/set-mongoose');

const app = require('../lib/app');

describe('the web article model', () => {
  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'web-articles';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const request = chai.request(app);

  const webTested =
    {
      title: 'Git it Quick',
      description: 'Methods for using git to uploading and downloading to github.',
      url: 'https://www.medium.com/git-it-quick',
      authorFirst: 'Shelly',
      authorLast: 'Hackz',
      publishDate: '2016-10-15',
      tags: ['git', 'terminal', 'testing']
    };

  it('navigates to POST and stashes a new web article', (done) => {
    request
      .post('/web-articles')
      .send(webTested)
      .then((res) => {
        const webArticle = res.body;
        expect(webArticle.data._id).to.be.ok;
        webTested.__v = 0;
        webTested._id = webArticle.data._id;
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all web articles', (done) => {
    request
      .get('/web-articles')
      .then((res) => {
        expect(res.body).is.ok;
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a web article by id', (done) => {
    request
      .get(`/web-articles/${webTested._id}`)
      .then((res) => {
        const webArticle = res.body;
        expect(webArticle.data.url).to.deep.equal('https://www.medium.com/git-it-quick');
        done();
      })
      .catch(done);
  });

  it('stashes a web article with no tags', (done) => {
    request
      .post('/web-articles')
      .send({
        title: 'empty web article',
        description: 'an article for testing',
        url: 'https://www.somewebsite.com',
      })
      .then((res) => {
        expect(res.body.data._id).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('finds web-articles with a tag named testing', (done) => {
    request
      .get('/web-articles/search/tags/testing')
      .then((res) => {
        expect(res.body.data[0].tags).to.include('testing');
        done();
      })
      .catch(done);
  });

  it('updates a web article in the database', (done) => {
    request
      .put(`/web-articles/${webTested._id}`)
      .send({title: 'modified web article for testing', description: 'modified description'})
      .then((res) => {
        expect(res.body.data.description).to.deep.equal('modified description');
        done();
      })
      .catch(done);
  });

  it('deletes a web article from the database', (done) => {
    request
      .delete(`/web-articles/${webTested._id}`)
      .then(() => {
        request
          .get(`/web-articles/${webTested._id}`)
          .then((res) => {
            expect(res.body.data).to.deep.equal(undefined);
          });
        done();
      })
      .catch(done);
  });

});
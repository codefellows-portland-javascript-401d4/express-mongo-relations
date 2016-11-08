const app = require('../lib/app');

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;
chai.use(chaiHttp);

mongoose.Promise = Promise;

//need to connect to db
const connection = require('../lib/set-mongoose');
//need to connect to server
const request = chai.request(app);

describe('e2e testing for app', () => {

  it('fails when navigating to an unknown path', (done) => {
    request
      .get('/nowhere/fast')
      .then(() => {
        done();
      })
      .catch((err) => {
        expect(err).to.have.status(400);
        expect(err.message).to.be.equal('no path by that name, please check you map.');
        done(err);
      });
  });

});

describe('e2e testing the note model', () => {
  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'notes';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  const noteTested =
    {
      title: 'note for testing',
      text: 'test and learn',
      tags: ['notes', 'terminal', 'testing']
    };

  it('returns status code = 200 on successful requests', (done) => {
    request
      .get('/notes')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('navigates to POST and stashes a new note', (done) => {
    request
      .post('/notes')
      .send(noteTested)
      .then((res) => {
        const note = res.body;
        expect(note.data._id).to.be.ok;
        noteTested.__v = 0;
        noteTested._id = note.data._id;
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all notes', (done) => {
    request
      .get('/notes')
      .then((res) => {
        expect(res.body).is.ok;
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a note by id', (done) => {
    request
      .get(`/notes/${noteTested._id}`)
      .then((res) => {
        const note = res.body;
        expect(note.data.text).to.deep.equal('test and learn');
        done();
      })
      .catch(done);
  });

  it('stashes a note with no tags', (done) => {
    request
      .post('/notes')
      .send({title: 'empty note test', text: 'not so empty'})
      .then((res) => {
        expect(res.body.data._id).to.be.ok;
        done();
      })
      .catch(done);
  });

  it('updates a note in the database', (done) => {
    request
      .put(`/notes/${noteTested._id}`)
      .send({title: 'modified note for testing', text: 'modified text', tags: ['notes', 'terminal', 'testing']})
      .then((res) => {
        expect(res.body.data.text).to.deep.equal('modified text');
        done();
      })
      .catch(done);
  });

  it('deletes a note from the database', (done) => {
    request
      .delete(`/notes/${noteTested._id}`)
      .then(() => {
        request
          .get(`/notes/${noteTested._id}`)
          .then((res) => {
            expect(res.body.data).to.deep.equal(undefined);
          });
        done();
      })
      .catch(done);
  });

  it('returns the last 5 updated notes', (done) => {
    request
      .get('/notes/last5/notes')
      .then((data) => {
        expect(data.length <= 5);
        done();
      })
      .catch(done);
  });

});

describe('e2e testing the web article model', () => {
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
  
  it('returns status code = 200 on successful requests', (done) => {
    request
      .get('/web-articles')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
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

describe('e2e testing the tag model', () => {
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

  const tagTested =
    {
      name: 'tag for testing',
      description: 'test and learn',
      heat: 'warm'
    };
  
  it('returns status=200 on successful requests & at test start, collection is empty', (done) => {
    request
      .get('/tags')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ message: 'There are no tags, add some!' });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  
  it('navigates to POST and stashes a new tag', (done) => {
    request
      .post('/tags')
      .send(tagTested)
      .then((res) => {
        const tag = res.body;
        expect(tag.data._id).to.be.ok;
        tagTested.__v = 0;
        tagTested._id = tag.data._id;
        console.log(res.body, tagTested._id);
        done();
      })
      .catch(done);
  });

  it('navigates to the root and GETs all tags', (done) => {
    request
      .get('/tags')
      .then((res) => {
        expect(res.body[0].heat).to.deep.equal('warm');
        done();
      })
      .catch(done);
  });

  it('navigates to root and GETs all tags and associated notes & web-articles', (done) => {
    const testNote = {
      title: 'test note to show population',
      text: 'the test note text',
      tagId: tagTested._id
    };

    const testWebArticle = {
      title: 'test article to show population',
      description: 'a test description',
      url: 'http:www.test.this',
      tagId: tagTested._id
    };

    request
      .post('/notes')
      .send(testNote)
      .then((res) => {
        const note = res.body;
        expect(note.data._id).to.be.ok;
        testNote.__v = 0;
        testNote._id = note.data._id;
      })
      .then(() => {
        request
          .post('/web-articles')
          .send(testWebArticle)
          .then((res) => {
            const webArticle = res.body;
            expect(webArticle.data._id).to.be.ok;
            testWebArticle.__v = 0;
            testWebArticle._id = webArticle.data._id;
          });
      })
      .then(() => {
        console.log('tagTested id', tagTested._id);
        request
          .get(`/tags/${tagTested._id}`)
          .then((res) => {
            const tag = res.body.data;
            let expVal = {};
            console.log(res.body);
            expect(expVal).to.deep.equal(tag);
            done();
          })
          .catch(done);
      })
      .catch(done);
  });

  it('stashes a tag with no heat', (done) => {
    request
      .post('/tags')
      .send({name: 'empty tag test', description: 'just for testing', heat: ''})
      .then((res) => {
        expect(res.body.data).to.be.ok;
        expect(res.body.data.heat).to.deep.equal('');
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

  // it('finds tags with a heat valued warm', (done) => {
  //   request
  //   .get('/tags/search/heat/warm')
  //   .then((res) => {
  //     expect(res.body.data[0].heat).to.include('warm');
  //     done();
  //   })
  //   .catch(done);
  // });

  // it('deletes a tag from the database', (done) => {
  //   request
  //     .delete(`/tags/${tagTested._id}`)
  //     .then(() => {
  //       request
  //         .get(`/tags/${tagTested._id}`)
  //         .then((res) => {
  //           expect(res.body.data).to.deep.equal(undefined);
  //         });
  //       done();
  //     })
  //     .catch(done);
  // });

});
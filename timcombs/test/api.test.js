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
  before((done) => {
    const CONNECTED = 1;
    if (connection.readyState === CONNECTED) dropCollection();
    else connection.on('open', dropCollection);

    function dropCollection() {
      const name = 'users';
      connection.db
        .listCollections({name})
        .next((err, callinfo) => {
          if (!callinfo) return done();
          connection.db.dropCollection(name, done);
        });
    }
  });

  it('fails when navigating to an unknown path', (done) => {
    request
      .get('/nowhere/fast')
      .then(() => {
        done('should never be called');
      })
      .catch((res) => {
        expect(res).to.have.status(400);
        expect(res.response.body.error).to.deep.equal('no path by that name, please check your map.');
        done();
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

  const user = {
    username: 'Gesta Persona',
    password: 'p4$$w04d'
  };

  let token = '';

  it('on a sign-up generate a token for notes testing', (done) => {
    request
      .post('/auth/signup')
      .send(user)
      .then((res) => {
        token = res.body.token;
        expect(token).to.be.ok;
      })
      //what is this?
      .then(done, done);
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body).is.ok;
        done();
      })
      .catch(done);
  });

  it('navigates to /:id and GETs a note by id', (done) => {
    request
      .get(`/notes/${noteTested._id}`)
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
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
      .set('Authorization', `Bearer ${token}`)
      .then(() => {
        return request
          .get(`/notes/${noteTested._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then(() => {
            done('should not be called');
          })
          .catch((err) => {
            expect(err.response.error.text).to.deep.equal('{"error":"That note does not exist. Perhaps you meant to create a new note?"}');
            done();
          });
      })
      .catch(done);
  });

  it('returns the last 5 updated notes', (done) => {
    request
      .get('/notes/last5/notes')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        expect(res.body.data.length <= 5).to.be.ok;
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
        return request
          .get(`/web-articles/${webTested._id}`)
          .then(() => {
            done('not getting called');
          })
          .catch((err) => {
            expect(err.response.error.text).to.equal('{"error":"That web article does not exist. Perhaps you meant to add a new web article?"}');
            done();
          });
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

  const user = {
    username: 'geseta Testona',
    password: 'p4$$w04d',
    roles: ['admin']
  };

  let tagToken = '';

  it('on sign-up generate a token for tag testing', (done) => {
    request
      .post('/auth/signup')
      .send(user)
      .then((res) => {
        tagToken = res.body.token;
        expect(tagToken).to.be.ok;
      })
      //what is this?
      .then(done, done);
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
      .set('Authorization', `Bearer ${tagToken}`)
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
      .set('Authorization', `Bearer ${tagToken}`)
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
      .get('/tags')
      .set('Authorization', `Bearer ${tagToken}`)
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

    const expVal = { 
      message: 'Your tag has been found',
      data: {
        _id: tagTested._id,
        name: 'tag for testing',
        description: 'test and learn',
        heat: 'warm',
        __v: 0,
        notes: [testNote],
        webArticles: [testWebArticle]
      }
    };

    const notesPromise = request
      .post('/notes')
      .set('Authorization', `Bearer ${tagToken}`)
      .send(testNote)
      .then((res) => {
        const note = res.body;
        delete testNote.tagId;
        testNote._id = note.data._id;
      });

    const articlesPromise = request
      .post('/web-articles')
      .set('Authorization', `Bearer ${tagToken}`)
      .send(testWebArticle)
      .then((res) => {
        const webArticle = res.body;
        delete testWebArticle.tagId;
        testWebArticle._id = webArticle.data._id;
      });

        
    Promise.all([articlesPromise, notesPromise])
      .then(() => {
        return request
          .get(`/tags/${tagTested._id}`)
          .set('Authorization', `Bearer ${tagToken}`);
      })
      .then((res) => {
        expect(res.body).to.deep.equal(expVal);
        done();
      })
      .catch(done);
  });

  it('stashes a tag with no heat', (done) => {
    request
      .post('/tags')
      .set('Authorization', `Bearer ${tagToken}`)
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
      .set('Authorization', `Bearer ${tagToken}`)
      .send({name: 'modified tag for testing', description: 'modified tag text', heat: 'warm'})
      .then((res) => {
        expect(res.body.data.description).to.deep.equal('modified tag text');
        done();
      })
      .catch(done);
  });

  it('finds tags with a heat valued warm', (done) => {
    request
    .get('/tags/search/heat/warm')
    .set('Authorization', `Bearer ${tagToken}`)
    .then((res) => {
      expect(res.body.data[0].heat).to.include('warm');
      done();
    })
    .catch(done);
  });

  it('deletes a tag from the database', (done) => {
    request
      .delete(`/tags/${tagTested._id}`)
      .set('Authorization', `Bearer ${tagToken}`)
      .then(() => {
        return request
          .get(`/tags/${tagTested._id}`)
          .set('Authorization', `Bearer ${tagToken}`)
          .then(() => {
            done('not getting called');
          })
          .catch((err) => {
            expect(err.response.error.text).to.equal('{"error":"That tag does not exist. Perhaps you meant to create a new tag?"}');
            done();
          });
      })
      .catch(done);
  });

});
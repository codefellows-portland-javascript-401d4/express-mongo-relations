const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const connection = require('../lib/mongoose-setup');
const app = require('../lib/app');

describe('tests the animechars and animeshows api along with db relations', () => {
    
    before( done => {
        const CONNECTED = 1;
        if (connection.readyState === CONNECTED) dropCollection();
        else connection.on('open', dropCollection);

        function dropCollection() {
            const animeshow = 'animeshow';
            const animechar = 'animechar';
            connection.db
                .listCollections({name: [animeshow, animechar]})
                .next((err, callinfo) => {
                    if (!callinfo) return done();
                    connection.db.dropCollection([animeshow, animechar], done);
                });
        };
    });

    const request = chai.request(app);
    const keiichi = {
        name: 'Keiichi Maebara',
        age: 16,
        power: 'Breaking Fate',
        attackpower: 8,
        hair_color: 'brown',
    };
    const higurashi = {
        showname: 'Higurashi no Naku Koro Ni',
        airdate: '2006-04-04',
        genre: 'mystery horror'
    };
    let show_id = '';

    it('checks that the /GET request is empty since databases are currently unloaded', done => {
        request
            .get('/animechars')
            .then(res => {
                assert.deepEqual(res.body, []);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            });
    });

    it('uses /POST to post a new anime show into the database', done => {
        request
            .post('/animeshows')
            .send(higurashi)
            .then(res => {
                higurashi._id = res.body._id;
                higurashi.__v = 0;
                higurashi.airdate = res.body.airdate;
                higurashi.characters = [];
                assert.deepEqual(res.body, higurashi);
                done();
            })
            .catch(err => {
                console.log('this is the error',err);
                done(err);
            });
    });

    it('calls /DELETE on the given show to remove it from the database', done => {
        request
            .del('/animeshows/' + higurashi._id)
            .then(res => {
                assert.deepEqual(res.body, higurashi);
                done();
            })
            .catch(err => {
                console.log(err);
                done(err);
            });
    });
});
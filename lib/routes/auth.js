'use strict';

const router = require('express').Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

// validate token
router.post('/validate', ensureAuth, (request, response, next) => {
    response.send({ valid: true });
});

router.post('/signup', bodyParser, (request, response, next) => {
    const { username, password } = request.body;

    delete request.body.password;

    if(!username || !password) {
        return next({
            code: 400,
            error: 'username and password must be provided'
        });
    }

    User.find({ username })
        .count()
        .then(count => {
            if (count > 0) throw { code: 400, error: `username ${ username } already exists` }

            const user = new User(request.body);
            user.generateHash(password);
            return user.save();
        })
        .then(user => token.sign(user))
        .then(token => response.send({ token }))
        .catch(next);
});

router.post('/signin', bodyParser, (request, response, next) => {
    const { username, password } = request.body;
    
    delete request.body.password;

    User.findOne({ username })
        .then(user => {
            if(!user || !user.compareHash(password)) {
                throw { code: 400, error: 'invalid username or password' };
            }
            return token.sign(user);
        })
        .then(token => response.send({ token }))
        .catch(next);
});

module.exports = router;

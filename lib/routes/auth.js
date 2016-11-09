const router = require('express').Router();
const bodyParser = require('body-parser').json();

const User = require('../models/user');
const token = require('../auth/token');
const ensureAuth = require('../auth/ensure_auth')();

router
    // Token validation
    .post('/validate', ensureAuth, (req, res) => {
        res.send({ valid: true });
    })

    .post('/signup', bodyParser, (req, res, next) => {

        // When a user signs up, the req.body will have username and password properties
        const { username, password, roles } = req.body;
        delete req.body.password;

        // Error if neither a username or password is entered
        if (!username || !password) {
            return next ({
                code: 400,
                error: 'username and password must be entered'
            });
        }

        // Check to see if username is unique (i.e. is there an existing user that already has the username entered by the new user?)
        User.find( { username: username } )
            .count()
            .then(count => {
                if (count > 0) throw {
                    code: 400,
                    error: `username ${username} has been used`};

                const user = new User(req.body);
                user.generateHash(password);
                return user.save();
            })
            // Creates a token for the user
            .then(user => token.sign(user))
            // The token is sent back as the response
            .then(token => res.send({ token }))
            .catch(next);
    })

    .post('/signin', bodyParser, (req, res, next) => {

        // When a user signs in, the req.body will have username and password properties
        const { username, password, roles } = req.body;
        delete req.body.password;
        console.log(req.body);

        User.findOne( { username: username} )
            .then(user => {
                // Check if user exists and if the supplied password is valid
                if (!user || !user.compareHash(password)) {
                    throw {
                        code: 400,
                        error: 'invalid username or password'};
                }

                // Token is created for subsequent requests
                return token.sign(user);
            })
            // The token is sent back as the response
            .then(token => res.send({ token }))
            .catch(next);
    });

module.exports = router;

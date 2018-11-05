const router = require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../models/user');

const token = require('../auth/token');
const ensureAuth = require('../auth/ensure-auth')();

//validate a token (is it good)
router.post('/validate', ensureAuth, (req, res, next) => { //eslint-disable-line
  res.send({valid: true});
});

router.post('/signup', jsonParser, (req, res, next) => { //eslint-disable-line
  //req.body will have username & password properties
  const {username, password} = req.body;

  //have a reference now remove from body
  delete req.body.password;

  if(!username || !password) {
    return next ({
      code: 400,
      error: 'username and password must be supplied'
    });
  }

  //look for user that already has that name
  User.find({username}) //same as: {username: username}
    .count()
    .then((count) => {
      //does username exist?
      if(count > 0) throw {code: 400, error: `username ${username} already exists`};

      //create user object, hash password & save
      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    //token creation for subsequent requests
    .then((user) => token.sign(user))
    //send token as response
    .then((token) => res.send({token}))
    .catch(next);
});

router.post('/signin', jsonParser, (req, res, next) => {
  //req.body will have username & password properties
  const {username, password} = req.body;
  //have reference, now remove from body;
  delete req.body.password;

  //find User by username
  User.findOne({username})
    .then((user) => {
      //make sure user exists & password is valid
      if (!user || !user.compareHash(password)) {
        throw {code: 400, error: 'invalid username or password'};
      }

      //token creation for subsequent requests
      return token.sign(user);
    })
    //send token as response
    .then((token) => res.send({token}))
    .catch(next);
});

module.exports = router;
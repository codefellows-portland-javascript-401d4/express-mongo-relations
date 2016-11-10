const router = require('express').Router();
const bodyparser = require('body-parser').json();
const User = require('../models/user');

const token = require('../auth/token');

const ensureAuth = require('../auth/ensure-auth');

router.post('/signup', bodyparser, (req, res, next) => {
  //req.body will have username and password properties that will get assigned
  const { username, password } = req.body;

  //is the same as
    //const suername = req.body.username;

  //delete so that it doesn't get exposed later in code
  //ex. if you send back req.. it will still have password on it
  delete req.body.password;

  if(!username || !password){
    return next({
      code: 400,
      error: 'username and password required'
    });
  }

  User.find({ username }) //make object wiht key and value of username { username : username }
    .count()
    .then(count => {
      if(count > 0) throw { code: 400, error: `username ${username} already exists`};

      const user = new User(req.body);
      user.generateHash(password);
      return user.save();
    })
    .then(user => token.create(user)) //create a session token
    .then(token => res.send({token}))
    .catch(next);
});

router.post('/validate', ensureAuth, (req, res) => {
  res.send( { valid: true });
});

router.post('/signin', bodyparser, (req, res, next) => {
  const { username, password } = req.body; //req.body will have username and password
  delete req.body.password;

  User.findOne({ username })
    .then(user => {
      if(!user || !user.compareHash(password)){
        throw { code: 400, error: 'invalid username or password'};
      }

      return token.create(user); //create a session token
    })
    .then(token => res.send({token}))
    .catch(next);
});

module.exports = router;

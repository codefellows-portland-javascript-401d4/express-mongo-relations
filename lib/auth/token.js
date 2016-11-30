//this is the module that handles the json web token
//it requires in the jsonwebtoken npm module
//returns methods to sign in a user and verify if token invalid or expired

const jwt = require('jsonwebtoken');

//this is our app secret that enables tokens to break when tampered with
const seekreet = process.env.APP_SECRET || 'app-seekreet';

module.exports = {
  //method to take user and give back token
  sign(user) {
    return new Promise((resolve, reject) => {
      //this is (jwt optional) data we want stored in token
      //token is transparent, but cannot be modified w/out breaking
      const payload = {
        id: user._id,
        roles: user.roles
      };

      //make a token w/payload & use secret
      //why pass null?
      jwt.sign(payload, seekreet, null, (err, token) => {
        if (err) return reject(err);
        else resolve(token);
      });
    });
  },
  //method to verify token then resolve payload
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, seekreet, (err, payload) => {
        //if token bad, invalid or expired
        if (err) return reject(err);
        else resolve(payload);
      });
    });
  }
};
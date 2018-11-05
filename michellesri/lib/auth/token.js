const jwt = require('jsonwebtoken');

const coolSecret = 'cool-secret'; //jwt secret word

//jwt isn't promisified so we need to create a new promise
module.exports = {
  create(user){
    return new Promise((resolve, reject) => {

      const payload = { //what i encrypt into the jwt and what i expect to get from the jwt later
        id: user._id,
        roles: user.roles
      };

      //make jwt token with payload and use the coolSecret
      jwt.sign(payload, coolSecret, null, (err, token) => {
        if(err) return reject(err);
        resolve(token);
      });
    });
  },
  verify(token){
    return new Promise((resolve, reject) => {
      jwt.verify(token, coolSecret, (err, payload) => {
        if(err) return reject(err);
        resolve(payload);
      });
    });
  }

};

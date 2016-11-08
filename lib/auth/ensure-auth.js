//factory function
//returns a middleware function

//requires a token
const tokenSvc = require('./token');

//though not necess for this case - since we export a function
module.exports = function getEnsureAuth() {
  return function ensureAuth(req, res, next) {
    //look for token in the authorization header
    //(express lowercases all the headers)
    const authHeader = req.headers.authorization;

    //did not provide a token, error
    if (!authHeader) {
      return next({
        code: 400,
        error: 'unauthorized, no token provided'
      });
    }

    //authorization header is OFTEN in form "Bearer token"
    //be prepared for APIs having other forms
    const [bearer, jwt] = authHeader.split(' ');

    //check token for 'Bearer' and jwt
    if (bearer !== 'Bearer' || !jwt) {
      return next({
        code: 400,
        error: 'unauthorized, invalid token'
      });
    }


    //verify jwt token
    tokenSvc.verify(jwt)
      .then((payload) => {
        req.user = payload;
        next();
      })
      .catch((err) => {
        return err;
        // return next({
        //   code: 403,
        //   error: 'unauthorized, invalid token'
        // });
      });
  };
};
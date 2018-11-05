const tokenService = require('./token');

module.exports = function ensureAuth(req, res, next){

  const authHeader = req.headers.authorization;
  if(!authHeader){
    return next({
      code: 400,
      error: 'unauthorized, invalid token'
    });
  }

  //auth header is in one of the industry standards of 'Bearer token'
  const [bearer, jwt] = authHeader.split(' ');

  // is the same as:
    // const splitArr = authHeader.split(' ');
    // const bearer  = splitArr[0];
    // const jwt splitArr[1];

  //check for correct Bearer and jwt
  if(bearer !== 'Bearer' || !jwt){
    return next({
      code: 400,
      error: 'unathorized, invalid token'
    });
  }

  tokenService.verify(jwt)
    .then(payload => {
      req.user = payload;
      next();
    })
    .catch(err => {
      return next({
        code: 403,
        error: 'unauthorized, invalid token: ', err
      });
    });
};

const tokenCheck = require('./token');

module.exports = function ensureAuth() {

    return function ensureAuth(req, res, next) {

        // Check for token in the authorization header
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        // Error if no token was supplied
        if(!authHeader) {
            return next({
                code: 400,
                error: 'unauthorized: no token provided'
            });
        }

        // Authorization header has the format 'Bearer token' (common convention for auth)
        const [bearer, jwt] = authHeader.split(' ');

        // Confirm that authHeader has the correct prefix ('Bearer') and a jwt
        if(bearer !== 'Bearer' || !jwt) {
            return next({
                code: 400,
                error: 'unauthorized: invalid format or invalid token'
            });
        }

        // Verify the jwt token
        tokenCheck.verify(jwt)
            .then(payload => {
                req.user = payload;
                next();
            })
            .catch(err => {
                return next({
                    code:403,
                    error: 'unauthorized: invalid token'
                }, err);
            });
    };
};

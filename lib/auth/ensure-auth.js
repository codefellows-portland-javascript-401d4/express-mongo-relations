'use strict';

const tokenSvc = require('./token');

module.exports = function getEnsureAuth() {
    return function ensureAuth(request, response, next) {
        const authHeader = request.headers.authorization;

        if(!authHeader) {
            return next({
                code: 400,
                error: 'unauthorized, no token provided'
            });
        }
        // authHeader in form "bearer token"
        const [bearer, jwt] = authHeader.split(' ');

        if(bearer !== 'Bearer' || !jwt) {
            return next({
                code: 400,
                error: 'unauthorized, invalid token'
            });
        }
        tokenSvc.verify(jwt)
            .then(payload => {
                request.user = payload;
            next();
            })
            .catch(err => {
                return next({
                    err,
                    code: 403, 
                    error: 'unauthorized, invalid token'
                });
            });
    };
};

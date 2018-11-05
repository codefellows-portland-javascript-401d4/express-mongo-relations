'use strict';

module.exports = function errorHandler(err, request, response, next) {
    const code = err.code || 500;
    const error = code === 500 ? 'Internal server error' : err.error;

    console.error(err.error || err.message);
        response.status(code).send({ error });
        next();
};

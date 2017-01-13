module.exports = function errorHandler(err, req, res, next) {
    const knownError = err.code;
    const toLog = knownError ? `${error.code}: ${err.error}` : err;
    console.error(toLog);

    const code = err.code || 500;

    console.error(err.error || err.message);

    const error = code === 500 ? 'Internal Server Error' : err.error;
    res.status( code ).send({ error });
};
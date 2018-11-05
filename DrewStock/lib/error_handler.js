// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {

    let code = 500, error = 'Internal Server Error';

    // Mongoose Validation Error?
    if(err.name === 'ValidationError' || err.name === "CastError") {
        console.log(err.errors);
        code = 400;
        error = err.name;
    }
    // is this one of our errors?
    else if(err.code) {
        // by convention, we're passing in an object
        // with a code property === http statusCode
        // and a error property === message to display
        code = err.code;
        error = err.error;
        console.log(err.code, err.error);
    }
    // or something unexpected?
    else {
        console.log(err);
    }

    res.status(code).send({ error });

};

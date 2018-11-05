// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {
    let code = 500;
    let error = 'Internal Server Error';

    if(err.name === 'Validation Error' || err.name === 'Cast Error') {
        console.log(err.errors);
        code = 400;
        err.errors.name.message;
    } else if(err.code) {
        code = err.code;
        error = err.error;
        console.log(err.code, err.error);
    } else {
        console.log(err);
    }
    res.status(code).send({error});
};
module.exports = function errorHandler(err, request, response, next) {//eslint-disable-line
  
  err.code = 500;
  err.message = 'Internal server ERROR!';
  if(err.name === 'SyntaxError' || err.name === 'ValidationError') {
    err.code = 400;
    err.message = 'Invalid data input';
  } else if (err.name === 'CastError'){
    err.code = 404;
    err.message = 'Bad request path, resource does not exist';
  }
  console.error(err.code, err.message);
  response.status(err.code).send(`${err.code} ERROR: ${err.message}`);
};

module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-var
  const code = err.code || 500;
  const error = code === 500 ? 'Internal Server Error' : err.error;
  console.error(err.error || err.message);
  res.status(code).send({error});
};

module.exports = function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-var
  
  let code = 500;
  let error = 'Internal Server Error';

  if(err.name === 'ValidationError' || err.name === 'CastError') {
    console.log(err.errors);
    code = 400;
    error = err.errors.name.message;
  } else if (err.code) {
    code = err.code;
    error = err.error;
    console.log(err.code, err.error);
  } else {
    console.log(err);
  }

  res.status(code).send({error});


};

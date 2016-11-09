module.exports = function errHandler (err, req, res, next) { //eslint-disable-line
  let code = 500;
  let error = 'our server is having difficulties, sorry';

  //mongoose validation error?
  if(err.name === 'ValidationError' || err.name === 'Cast Error') {
    console.log(err.errors);
    code = 400;
    error = err.errors.name.message;
  }else if (err.code) {
    code = err.code;
    error = err.error;
    console.log(err.code, err.error);
  }else{
    console.log(err);
  }

  res.status(code).send({error});
};
module.exports = function errHandler (err, req, res, next) {//eslint-disable-line
  err.code = err.code || 500;
  err.error = err.code === 500 ? 'our server is having difficulties, sorry' : err.error;
  res.send(err);
};
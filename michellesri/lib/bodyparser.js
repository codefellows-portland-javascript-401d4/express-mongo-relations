module.exports = (req, res, next) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      req.body = JSON.parse(body);
      next();
    } catch(err){
      console.log('catch error in parser');
      let error = {};
      error.status = 400;
      error.message = 'invalid json: ', body;
      next(err);
    }
  });
  req.on('error', err => {
    console.log('error: ', err);
    let error = {};
    error.status = 500;
    error.message = 'error receiving request';
    next(error);
  });
};

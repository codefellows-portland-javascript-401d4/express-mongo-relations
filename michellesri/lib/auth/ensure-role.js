module.exports = function getEnsureRole(...roles){ //...roles puts all of the aguments in a roles array
  const lookup = roles.reduce((lookup, role) => {
    lookup[role] = true;
    return lookup;
  }, Object.create(null));

  return function ensureRoll(req, res, next){
    const userRoles = req.user.roles;

    if(userRoles && userRoles.some(role => lookup[role])){
      next();
    } else {
      next({
        code: 400,
        error: 'not authorized'
      });
    }
  };
};

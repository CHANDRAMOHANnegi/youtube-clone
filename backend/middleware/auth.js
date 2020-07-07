const jwt = require('jsonwebtoken');
const User = require('../database/models').User;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    req.isAuth = false;
    return next();
  }

  console.log("=======>", authorization);

  const token = authorization.split(' ')[1];

  if (!token || token === '') {
    req.isAuth = false;
    return next();
  };

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, 'secretKey');
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  };

  req.isAuth = true;
  req.user = decodedToken;
  next();

}


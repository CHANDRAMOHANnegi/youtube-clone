
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  if (Object.keys(req.body).length === 0) {
    return next();
  }
  console.log(res);

  const authHeader = req.body.variables['Authorization'];

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secretKey');
  } catch (err) {
    console.log(err);
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = decodedToken;
  console.log(decodedToken);

  next()
}


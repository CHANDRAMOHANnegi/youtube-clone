const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorizaion');
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
  } catch (error) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  
console.log("-------->>>>>>>>>>",decodedToken);


  req.isAuth = true;
  req.userId = decodedToken;
  next()
}


// let auth = (req, res, next) => {
//   let token = req.cookies.w_auth;

//   User.findByToken(token, (err, user) => {
//     if (err) throw err;
//     if (!user)
//       return res.json({
//         isAuth: false,
//         error: true
//       });

//     req.token = token;
//     req.user = user;
//     next();
//   });
// };

// module.exports = { auth };

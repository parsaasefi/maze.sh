const jwt = require('jsonwebtoken');

const jwtConfig = require('../configs/jwt');

const checkAuth = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    req.isAuthenticated = false;
  }

  try {
    const user = jwt.verify(token, jwtConfig.secret);

    req.user = user;
    req.isAuthenticated = true;
  } catch (err) {
    req.isAuthenticated = false;
  }

  return next();
};

module.exports = checkAuth;

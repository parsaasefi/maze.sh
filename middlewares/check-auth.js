const jwt = require('jsonwebtoken');

const jwtConfig = require('../configs/jwt');

const checkAuth = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) {
    req.authenticated = false;
  }

  try {
    jwt.verify(token, jwtConfig.secret);

    req.authenticated = true;
  } catch (err) {
    req.authenticated = false;
  }

  return next();
};

module.exports = checkAuth;

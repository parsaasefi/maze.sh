const jwt = require('jsonwebtoken');

const jwtConfig = require('../config/jwt');

const authenticateUser = (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const user = jwt.verify(token, jwtConfig.secret);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(403).json({ error: 'Token is invalid' });
  }
};

module.exports = authenticateUser;

const jwt = require('jsonwebtoken');

const AuthValidator = require('../validators/auth');
const AuthService = require('../services/auth');
const jwtConfig = require('../configs/jwt');

class AuthController {
  static async loginUser(req, res) {
    const { error: validationError } = AuthValidator.login(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.password.trim();
      const token = await AuthService.loginUser(email, password);

      return res.json({
        success: true,
        token,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static validateToken(req, res) {
    const token = req.header('auth-token');

    if (!token) {
      return res.json({ valid: false });
    }

    try {
      jwt.verify(token, jwtConfig.secret);

      return res.json({ valid: true });
    } catch (err) {
      return res.json({ valid: false });
    }
  }
}

module.exports = AuthController;

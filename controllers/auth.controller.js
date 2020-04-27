const AuthService = require('../services/auth.service');
const AuthValidator = require('../validators/auth');

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
      const { token, apiKey } = await AuthService.loginUser(email, password);

      return res.json({
        success: true,
        apiKey,
        token,
        email,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AuthController;

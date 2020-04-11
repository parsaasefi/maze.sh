const ValidationHelper = require('../helpers/validation');
const AuthService = require('../services/auth');

class AuthController {
  static async loginUser(req, res) {
    const { error: validationError } = ValidationHelper.loginValidation(
      req.body
    );

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.password.trim();
      const token = await AuthService.loginUser(email, password);

      return res.json({ token });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = AuthController;

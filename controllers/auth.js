const ValidationHelper = require('../helpers/validation');
const AuthService = require('../services/auth');

class AuthController {
  static async registerUser(req, res) {
    const { error: validationError } = ValidationHelper.registerValidation(
      req.body
    );

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const name = req.body.name.toLowerCase().trim();
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.name.trim();
      const user = await AuthService.registerUser(name, email, password);

      return res.json(user);
    } catch (err) {
      return res.json({ error: err.message });
    }
  }
}

module.exports = AuthController;

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
      const password = req.body.password.trim();
      const user = await AuthService.registerUser(name, email, password);

      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

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

  static deleteUser(req, res) {
    const { error: validationError } = ValidationHelper.deleteUserValidation(
      req.body
    );

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });
  }
}

module.exports = AuthController;

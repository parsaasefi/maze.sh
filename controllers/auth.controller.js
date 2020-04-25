const AuthValidator = require('../validators/auth');

class AuthController {
  static loginUser(req, res) {
    const { error: validationError } = AuthValidator.login(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });
  }
}

module.exports = AuthController;

const ValidationHelper = require('../helpers/validation');

class AuthController {
  static registerUser(req, res) {
    const { error: validationError } = ValidationHelper.registerValidation(
      req.body
    );

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });
  }
}

module.exports = AuthController;

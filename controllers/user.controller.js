const UserService = require('../services/user.service');
const UserValidator = require('../validators/user');

class UserController {
  static async registerUser(req, res) {
    const { error: validationError } = UserValidator.register(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.password.trim();

      await UserService.registerUser(email, password);

      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async getInfo(req, res) {
    try {
      const { id } = req.user;
      const { email, apiKey } = await UserService.getInfo(id);

      return res.json({
        success: true,
        email,
        apiKey,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async editUser(req, res) {
    const { error: validationError } = UserValidator.edit(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });
  }
}

module.exports = UserController;

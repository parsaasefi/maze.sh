const UserValidator = require('../validators/user');
const UserService = require('../services/user');

class UserController {
  static async getUserData(req, res) {
    try {
      const { id } = req.user;
      const userData = await UserService.getUserData(id);

      return res.json({
        success: true,
        data: {
          name: userData.name,
          email: userData.email,
          apiKey: userData.apiKey,
        },
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async registerUser(req, res) {
    const { error: validationError } = UserValidator.register(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const name = req.body.name.toLowerCase().trim();
      const email = req.body.email.toLowerCase().trim();
      const password = req.body.password.trim();

      await UserService.registerUser(name, email, password);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async deleteUser(req, res) {
    const { error: validationError } = UserValidator.delete(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const password = req.body.password.trim();
      const { id } = req.user;

      await UserService.deleteUser(id, password);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async updateUser(req, res) {
    const { error: validationError } = UserValidator.update(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const { id } = req.user;
      const name = req.body.name.toLowerCase().trim();
      const email = req.body.email.toLowerCase().trim();

      await UserService.updateUser(id, name, email);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async changePassword(req, res) {
    const { error: validationError } = UserValidator.changePassword(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const password = req.body.password.trim();
      const newPassword = req.body.new_password.trim();
      const { id } = req.user;

      await UserService.changePassword(id, password, newPassword);
      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  static async getLinks(req, res) {
    try {
      const { id } = req;
      const links = await UserService.getLinks(id);

      return res.json({
        success: true,
        links,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = UserController;

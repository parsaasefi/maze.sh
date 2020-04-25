const UserService = require('../services/user.service');

class UserController {
  static async registerUser(req, res) {
    try {
      await UserService.registerUser('hik', 'jojoj');
      return res.json({ success: true });
    } catch (err) {
      return res.send(err.message);
    }
  }
}

module.exports = UserController;

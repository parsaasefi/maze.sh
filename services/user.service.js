const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const APIHelper = require('../helpers/api');

class UserService {
  /**
   * Register a new user
   * @param {String} email User's email
   * @param {String} password User's password
   * @returns {Promise}
   */
  static async registerUser(email, password) {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) throw new Error('Email already exists');

    const salt = bcrypt.genSaltSync(10);
    const hashedKey = bcrypt.hashSync(password, salt);

    const newUser = await new UserModel({
      email,
      password: hashedKey,
    }).save();

    const apiKey = APIHelper.generateKey(newUser._id);
    newUser.apiKey = apiKey;

    return newUser.save();
  }

  /**
   * Get info of the user with the given id
   * @param {String} id User's id
   * @returns {Object} User's info
   */
  static async getInfo(id) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User doesn't exists");

    const info = {
      email: user.email,
      apiKey: user.apiKey,
    };

    return info;
  }

  /**
   * Edit the email of the given user
   * @param {String} id User's id
   * @param {String} newEmail User's new email to be saved
   * @returns {Promise}
   */
  static async editUser(id, newEmail) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User doesn't exists");

    const emailExists = await UserModel.findOne({ email: newEmail });

    if (emailExists && String(emailExists._id) !== id) {
      throw new Error('Email already exists');
    }

    user.email = newEmail;

    return user.save();
  }

  /**
   * Change the user's password
   * @param {String} id User's id
   * @param {String} currentPassword User's current password
   * @param {String} newPassword User's new password to be stored
   * @returns {Promise}
   */
  static async changePassword(id, currentPassword, newPassword) {
    const user = await UserModel.findById(id);
    if (!user) throw new Error("User doesn't exists");

    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);
    if (!isPasswordValid) throw new Error('You password is incorrect');

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;

    return user.save();
  }
}

module.exports = UserService;

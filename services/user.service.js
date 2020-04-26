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
}

module.exports = UserService;

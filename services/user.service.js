const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const APIHelper = require('../helpers/api');

class UserService {
  static async registerUser(email, password) {
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      throw new Error('Email already exists');
    }

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
}

module.exports = UserService;

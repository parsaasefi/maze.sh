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
    const newUser = new UserModel({
      email,
      password: hashedKey,
    });

    await newUser.save();

    const user = await UserModel.findOne({ email });
    const apiKey = APIHelper.generateKey(user._id);

    user.apiKey = apiKey;
    return user.save();
  }
}

module.exports = UserService;

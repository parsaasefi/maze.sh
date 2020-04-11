const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const jwtConfig = require('../configs/jwt');

class AuthService {
  static async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    const errorMessage = 'Email or password is wrong';

    if (!user) {
      throw new Error(errorMessage);
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const id = user._id;
    const token = jwt.sign({ id }, jwtConfig.secret);
    return token;
  }
}

module.exports = AuthService;

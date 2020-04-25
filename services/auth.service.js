const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');
const jwtConfig = require('../config/jwt');

class AuthService {
  static async loginUser(email, password) {
    const user = await UserModel.findOne({ email });
    const errorMessage = 'Email or password is incorrect';

    if (!user) throw new Error(errorMessage);

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) throw new Error(errorMessage);

    const token = jwt.sign({ id: user._id }, jwtConfig.secret);

    return token;
  }
}

module.exports = AuthService;

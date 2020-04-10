const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const jwtConfig = require('../config/jwt');

class AuthService {
  static async registerUser(name, email, password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.findOne({ email });

    if (user) {
      throw new Error('Email already exists');
    }

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    return newUser.save();
  }

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

    const { _id } = user;
    const token = jwt.sign({ _id }, jwtConfig.secret);
    return token;
  }

  static async deleteUser(id, password) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error('Password is invalid');
    }

    return user.deleteOne();
  }

  static async updateUser(id, name, email) {
    const user = UserModel.findOne({ email });

    if (user && user._id !== id) {
      throw new Error('Email already exists');
    }

    return UserModel.updateOne(
      { _id: id },
      {
        $set: {
          name,
          email,
        },
      }
    );
  }
}

module.exports = AuthService;

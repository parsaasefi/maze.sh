const bcrypt = require('bcryptjs');

const UserModel = require('../models/User');

class UserService {
  static async getUserData(id) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    return user;
  }

  /**
   * Registers the user
   * @param {string} name User's name
   * @param {string} email User's email address
   * @param {string} password User's password
   * @returns {promise}
   */
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

  /**
   * Deletes the user
   * @param {string} id User's id
   * @param {string} password User's password
   * @returns {promise}
   */
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

  /**
   * Updates the user
   * @param {string} id User's id
   * @param {string} name User's name
   * @param {string} email User's email address
   * @returns {promise}
   */
  static async updateUser(id, name, email) {
    const user = await UserModel.findOne({ email });

    if (user && String(user._id) !== id) {
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

  /**
   * Changes the user's password
   * @param {string} id User's id
   * @param {string} password User's password
   * @param {string} newPassword New password to set
   * @returns {promise}
   */
  static async changePassword(id, password, newPassword) {
    const user = await UserModel.findOne({ _id: id });

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new Error('Password is invalid');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    return UserModel.updateOne(
      { _id: id },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
  }
}

module.exports = UserService;

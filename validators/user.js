const Joi = require('@hapi/joi');

class UserValidator {
  /**
   * Validates register request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static register(data) {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
    });

    return schema.validate(data);
  }

  /**
   * Validates delete user request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static delete(data) {
    const schema = Joi.object().keys({
      password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
  }

  /**
   * Validates update user request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static update(data) {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
    });

    return schema.validate(data);
  }

  /**
   * Validates change password request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static changePassword(data) {
    const schema = Joi.object().keys({
      password: Joi.string().required().label('Old password'),
      new_password: Joi.string().min(6).required().label('New password'),
    });

    return schema.validate(data);
  }
}

module.exports = UserValidator;

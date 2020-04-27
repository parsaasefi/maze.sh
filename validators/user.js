const Joi = require('@hapi/joi');

class UserValidator {
  /**
   * Validate register request
   * @param {Object} data Data to validate
   * @returns {Object} Validation result
   */
  static register(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
    });

    return schema.validate(data);
  }

  /**
   * Validate edit request
   * @param {Object} data Data to validate
   * @returns {Object} Validation result
   */
  static edit(data) {
    const schema = Joi.object().keys({
      newEmail: Joi.string().email().required().label('New email'),
    });

    return schema.validate(data);
  }

  /**
   * Validate change password request
   * @param {Object} data Data to validate
   * @returns {Object} Validation result
   */
  static changePassword(data) {
    const schema = Joi.object().keys({
      currentPassword: Joi.string().required().label('Current password'),
      newPassword: Joi.string().min(6).required().label('New password'),
    });

    return schema.validate(data);
  }

  /**
   * Validate delete account request
   * @param {Object} data Data to validate
   * @returns {Object} Validation result
   */
  static deleteAccount(data) {
    const schema = Joi.object().keys({
      password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
  }
}

module.exports = UserValidator;

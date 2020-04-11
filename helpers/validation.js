const Joi = require('@hapi/joi');

class ValidationHelper {
  /**
   * Validates register request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static registerValidation(data) {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
    });

    return schema.validate(data);
  }

  /**
   * Validates login request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static loginValidation(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('password'),
    });

    return schema.validate(data);
  }

  /**
   * Validates delete user request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static deleteUserValidation(data) {
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
  static updateUserValidation(data) {
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
  static changePasswordValidation(data) {
    const schema = Joi.object().keys({
      password: Joi.string().required().label('Old password'),
      new_password: Joi.string().min(6).required().label('New password'),
    });

    return schema.validate(data);
  }
}

module.exports = ValidationHelper;

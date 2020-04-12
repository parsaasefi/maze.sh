const Joi = require('@hapi/joi');

class AuthValidator {
  /**
   * Validates login request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
  static login(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
  }
}

module.exports = AuthValidator;

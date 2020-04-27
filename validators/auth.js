const Joi = require('@hapi/joi');

class AuthValidator {
  /**
   * Validate login request
   * @param {Object} data Data to validate
   * @returns {Object} Validation result
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

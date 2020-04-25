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
}

module.exports = UserValidator;

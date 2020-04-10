const Joi = require('@hapi/joi');

class ValidationHelper {
  static registerValidation(data) {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
    });

    return schema.validate(data);
  }
}

module.exports = ValidationHelper;

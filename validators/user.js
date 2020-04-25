const Joi = require('@hapi/joi');

class UserValidator {
  static register(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(6).required().label('Password'),
    });

    return schema.validate(data);
  }
}

module.exports = UserValidator;

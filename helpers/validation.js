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

  static loginValidation(data) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().required().label('password'),
    });

    return schema.validate(data);
  }

  static deleteUserValidation(data) {
    const schema = Joi.object().keys({
      password: Joi.string().required().label('Password'),
    });

    return schema.validate(data);
  }

  static updateValidation(data) {
    const schema = Joi.object().keys({
      name: Joi.string().required().label('Name'),
      email: Joi.string().email().required().label('Email'),
    });

    return schema.validate(data);
  }
}

module.exports = ValidationHelper;

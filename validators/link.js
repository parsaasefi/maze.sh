const Joi = require('@hapi/joi');

class LinkValidator {
  static create(data) {
    const schema = Joi.object().keys({
      destination: Joi.string()
        .uri({ allowRelative: true })
        .required()
        .label('URL'),
      custom_alias: Joi.string()
        .min(4)
        .optional()
        .allow('')
        .label('Custom alias'),
    });

    return schema.validate(data);
  }
}

module.exports = LinkValidator;

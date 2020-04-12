const Joi = require('@hapi/joi');

class LinkValidator {
  static create(data) {
    const schema = Joi.object().keys({
      destination: Joi.string()
        .uri({ allowRelative: true })
        .required()
        .label('URL'),
      alias: Joi.string().min(4).optional(),
    });

    return schema.validate(data);
  }
}

module.exports = LinkValidator;

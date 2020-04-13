const Joi = require('@hapi/joi');

class LinkValidator {
  /**
   * Validates create request
   * @param {object} data Request body
   * @returns {object} Validation result
   */
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
      password: Joi.string().min(6).optional().allow('').label('Password'),
    });

    return schema.validate(data);
  }

  /**
   * Validates the given custom alias
   * @param {string} alias Custom alias to be validated
   * @returns {boolean} True if the given alias is valid
   */
  static customAlias(alias) {
    const aliasPattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/;
    return aliasPattern.test(alias);
  }
}

module.exports = LinkValidator;

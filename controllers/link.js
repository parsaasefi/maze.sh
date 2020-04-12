const LinkValidator = require('../validators/link');

class LinkController {
  static createLink(req, res) {
    const { error: validationError } = LinkValidator.create(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });
  }
}

module.exports = LinkController;

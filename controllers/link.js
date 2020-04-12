const LinkValidator = require('../validators/link');
const LinkService = require('../services/link');

class LinkController {
  static async createLink(req, res) {
    const { error: validationError } = LinkValidator.create(req.body);

    if (validationError)
      return res
        .status(400)
        .json({ error: validationError.details[0].message.replace(/"/g, '') });

    try {
      const destination = req.body.destination.trim();
      const link = await LinkService.createLink(destination);

      return res.json(link);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = LinkController;

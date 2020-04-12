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
      if (req.isAuthenticated) {
        const destination = req.body.destination.trim();
        const alias = req.body.custom_alias || null;
        const isAliasValid = LinkValidator.customAlias(alias);

        if (alias && !isAliasValid) {
          throw new Error('Custom alias is not valid');
        }

        const link = await LinkService.createLink(destination, alias);

        return res.json(link);
      }

      const destination = req.body.destination.trim();
      const link = await LinkService.createLink(destination);

      return res.json(link);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = LinkController;

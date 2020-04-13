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
        const { id: creatorID } = req.user;
        const destination = req.body.destination.trim();
        const customAlias = req.body.custom_alias
          ? req.body.custom_alias.trim()
          : null;
        const isAliasValid = LinkValidator.customAlias(customAlias);
        const password = req.body.password ? req.body.password.trim() : null;

        if (customAlias && !isAliasValid) {
          throw new Error('Custom alias is not valid');
        }

        const link = await LinkService.createLink(
          destination,
          customAlias,
          creatorID,
          password
        );
        const response = {
          success: true,
          alias: link.alias,
        };

        if (password) response.protected = true;

        return res.json(response);
      }

      const destination = req.body.destination.trim();
      const link = await LinkService.createLink(destination);

      return res.json({
        success: true,
        alias: link.alias,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = LinkController;

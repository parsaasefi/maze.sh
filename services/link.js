const bcrypt = require('bcryptjs');

const LinkModel = require('../models/Link');
const LinkHelper = require('../helpers/link');
const URLHelper = require('../helpers/url');
const SecurityHelper = require('../helpers/security');

class LinkService {
  static async getLinkData(uuid) {
    const link = await LinkModel.findOne({ uuid });

    if (!link) throw new Error("This link doesn't exists");

    if (!link.password) {
      const data = {
        alias: link.alias,
        data: link.date,
        protected: true,
      };

      return data;
    }

    const data = {
      destination: link.destination,
      alias: link.alias,
      date: link.data,
    };

    return data;
  }

  /**
   * Shortens the given url (destination)
   * @param {string} destination URL to be shortened
   * @param {string} customAlias Custom alias
   * @param {string} creatorID The id of the creator
   * @param {string} password Password for the protected links
   * @returns {promise}
   */
  static async createLink(
    destination,
    customAlias,
    creatorID = null,
    password = null
  ) {
    const aliasSize = 6;
    let alias = LinkHelper.generateRandomAlias(aliasSize);

    if (!customAlias) {
      while (true) {
        const link = await LinkModel.findOne({ alias });
        if (!link) break;

        alias = LinkHelper.generateRandomAlias(aliasSize);
      }
    } else {
      const link = await LinkModel.findOne({ alias: customAlias });
      if (link) throw new Error('Custom alias already exists');

      alias = customAlias;
    }

    let hashedPassword = null;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(password, salt);
    }

    const finalDestination = await URLHelper.follow(destination);
    const security = await SecurityHelper.check(finalDestination);

    if (!security.isSafe) throw new Error('We detected this as a bad url');

    const newLink = new LinkModel({
      destination: finalDestination,
      creator_id: creatorID,
      password: hashedPassword,
      alias,
    });

    return newLink.save();
  }
}

module.exports = LinkService;

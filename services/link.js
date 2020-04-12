const LinkModel = require('../models/Link');
const LinkHelper = require('../helpers/link');
const URLHelper = require('../helpers/url');

class LinkService {
  static async createLink(destination) {
    const finalDestination = await URLHelper.follow(destination);
    let alias = LinkHelper.generateRandomAlias(6);

    while (true) {
      const link = LinkModel.findOne({ alias });
      if (!link) break;

      alias = LinkHelper.generateRandomAlias(6);
    }

    const newLink = new LinkModel({
      destination: finalDestination,
      alias,
    });

    return newLink.save();
  }
}

module.exports = LinkService;

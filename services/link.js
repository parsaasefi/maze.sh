const LinkModel = require('../models/Link');
const LinkHelper = require('../helpers/link');
const URLHelper = require('../helpers/url');

class LinkService {
  static async createLink(destination, customAlias, creatorID = null) {
    const finalDestination = await URLHelper.follow(destination);
    let alias = LinkHelper.generateRandomAlias(6);

    if (!customAlias) {
      while (true) {
        const link = await LinkModel.findOne({ alias });
        if (!link) break;

        alias = LinkHelper.generateRandomAlias(6);
      }
    } else {
      const link = await LinkModel.findOne({ alias: customAlias });
      if (link) throw new Error('Custom alias already exists');

      alias = customAlias;
    }

    const newLink = new LinkModel({
      destination: finalDestination,
      creator_id: creatorID,
      alias,
    });

    return newLink.save();
  }
}

module.exports = LinkService;

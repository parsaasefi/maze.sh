const dgadetective = require('dgadetective');
const URL = require('url');

const blacklist = require('../blacklist');
const URLHelper = require('./url');

class SecurityHelper {
  static async isBlacklisted(url) {
    const hosts = URLHelper.allPossibleHosts(url);
    const res = await blacklist.get(hosts);
    return res.length;
  }

  static async isDGA(url) {
    const { hostname } = URL.parse(URLHelper.removeWWW(url));
    const score = await dgadetective.checkDGA(hostname);
    return score > 100;
  }

  static async check(url) {
    const isBlacklisted = this.isBlacklisted(url);
    const isDGA = this.isDGA(url);

    if (isBlacklisted)
      return {
        isSafe: false,
        type: 'blacklist',
      };

    if (isDGA)
      return {
        isSafe: false,
        type: 'dga',
      };

    return { isSafe: true };
  }
}

module.exports = SecurityHelper;

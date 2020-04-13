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
}

module.exports = SecurityHelper;

const dgadetective = require('dgadetective');
const URL = require('url');

const blacklist = require('../blacklist');
const URLHelper = require('./url');

class SecurityHelper {
  /**
   * Checks of the url exists in the blacklist
   * @param {string} url URL to check
   * @returns {boolean} True if it exists in the blacklist
   */
  static async isBlacklisted(url) {
    const hosts = URLHelper.allPossibleHosts(url);
    const [res] = await blacklist.get(hosts);
    return res.length > 0;
  }

  /**
   * Checks if the url is generated using dga
   * @param {string} url URL to check
   * @returns {boolean} True if it is detected as dga
   */
  static async isDGA(url) {
    const { hostname } = URL.parse(URLHelper.removeWWW(url));
    const score = await dgadetective.checkDGA(hostname);
    return score > 100;
  }

  /**
   * Checks the url in both blacklist and dga detection
   * @param {string} url URL to check its security
   * @returns {object} Object contains isSafe and type
   */
  static async check(url) {
    const isBlacklisted = await this.isBlacklisted(url);
    const isDGA = await this.isDGA(url);

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

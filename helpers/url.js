const followRedirect = require('follow-redirect-url');

class URLHelper {
  /**
   * Follows the redirects of the given url
   * @param {string} url URL to follow its redirects
   * @returns {string} Last destination url
   */
  static follow(url) {
    return followRedirect
      .startFollowing(url)
      .then(urls => urls.slice(-1)[0].url);
  }
}

module.exports = URLHelper;

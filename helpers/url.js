const followRedirect = require('follow-redirect-url');
const URL = require('url');

class URLHelper {
  static addProtocol(url) {
    const httpPattern = /^http/i;
    const relativePattern = /^\/\//i;

    if (httpPattern.test(url)) return url;
    if (relativePattern.test(url)) return `https:${url}`;
    return url;
  }

  static removeWWW(url) {
    const parsedURL = URL.parse(url);
    const { hostname } = parsedURL;

    if (hostname.split('.')[0] === 'www') {
      parsedURL.hostname = hostname.split('.').slice(1).join('.');
      parsedURL.host = parsedURL.hostname;
    }

    return URL.format(parsedURL);
  }

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

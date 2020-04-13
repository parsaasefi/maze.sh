const followRedirect = require('follow-redirect-url');
const URL = require('url');

class URLHelper {
  /**
   * Adds protocol the url if it doesn't already have
   * @param {string} url URL to add protocol to
   * @returns {string} URL with protocol
   */
  static addProtocol(url) {
    const httpPattern = /^http/i;
    const relativePattern = /^\/\//i;

    if (httpPattern.test(url)) return url;
    if (relativePattern.test(url)) return `https:${url}`;
    return url;
  }

  /**
   * Removes www from the hostname of the url
   * @param {string} url URL to remove www from
   * @returns {string} URL without www in its hostname
   */
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
   * Extracts all the possible hostname from the given url
   * @param {string} url URL to extract hostnames from
   * @returns {array} Contains all the possible hosts
   */
  static allPossibleHosts(url) {
    const parsedURL = URL.parse(this.removeWWW(url));
    const { hostname } = parsedURL;
    const { length } = hostname.split('.');
    const hosts = [hostname];

    for (let i = 1; i < length - 1; i++) {
      const host = hostname.split('.').slice(i);
      hosts.push(host);
    }

    return hosts;
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

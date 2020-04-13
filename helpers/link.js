const _ = require('lodash');

class LinkHelper {
  /**
   * Creates a random alias with the given size
   * @param {number} size Size of the alias
   * @returns {string} Random alias
   */
  static generateRandomAlias(size) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsArray = chars.split('');
    const shuffledChars = _.shuffle(charsArray);
    const aliasArray = [];

    for (let i = 0; i < size; i++) {
      const randomChar = _.sample(shuffledChars);
      aliasArray.push(randomChar);
    }

    const alias = aliasArray.join('');
    return alias;
  }
}

module.exports = LinkHelper;

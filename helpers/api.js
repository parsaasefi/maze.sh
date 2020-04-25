const CryptoJS = require('crypto-js');
const _ = require('lodash');

class APIHelper {
  static generateKey(id) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shuffledChars = _.shuffle(chars.split(''));
    const keySize = 30;
    const keyArray = [];

    for (let i = 0; i < keySize; i++) {
      const randomChar = _.sample(shuffledChars);
      keyArray.push(randomChar);
    }

    const key = keyArray.join('') + id + Date.now();
    const hashedKey = CryptoJS.SHA1(key).toString();

    return hashedKey;
  }
}

module.exports = APIHelper;

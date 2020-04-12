const CryptoJS = require('crypto-js');
const _ = require('lodash');

class APIHelper {
  static generateKey() {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charsArray = chars.split('');
    const shuffledChars = _.shuffle(charsArray);
    const keyArray = [];
    const size = 30;

    for (let i = 0; i < size; i++) {
      const randomChar = _.sample(shuffledChars);
      keyArray.push(randomChar);
    }

    const key = keyArray.join('') + Date.now();
    const hashedKey = CryptoJS.SHA1(key).toString();

    return hashedKey;
  }
}

module.exports = APIHelper;

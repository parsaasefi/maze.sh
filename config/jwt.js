const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  secret: process.env.JWT_SECRET || 'secret',
};

module.exports = config;

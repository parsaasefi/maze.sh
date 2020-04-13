const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const config = {
  host: process.env.BL_HOST || '127.0.0.1',
  port: process.env.BL_PORT || 3306,
  user: process.env.BL_USER || 'root',
  password: process.env.BL_PASSWORD || '',
  database: process.env.BL_DATABASE || 'mazed',
};

module.exports = config;

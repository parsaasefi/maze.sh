const mongoose = require('mongoose');

const APIHelper = require('../helpers/api');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    default: APIHelper.generateKey,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;

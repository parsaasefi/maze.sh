const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const linkSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  uuid: {
    type: String,
    default: uuidv4,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  creator_id: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const linkModel = mongoose.model('Link', linkSchema);

module.exports = linkModel;

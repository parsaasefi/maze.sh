const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const linkModel = mongoose.model('Link', linkSchema);

module.exports = linkModel;
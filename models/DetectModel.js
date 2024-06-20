const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetectSchema = new Schema({
  fileName: {
    type: String,
    required: true
  },
  photo: {
    type: Buffer,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DetectModel = mongoose.model('detects', DetectSchema);
module.exports = DetectModel;

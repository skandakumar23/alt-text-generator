const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  imageAltText: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now 
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;

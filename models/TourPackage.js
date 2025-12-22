const mongoose = require('mongoose');

const tourPackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: String, required: true },
  highlights: [String],
  inclusions: [String],
  photos: [String],
  isFeatured: { type: Boolean, default: false },
  discount: String
}, { timestamps: true });

module.exports = mongoose.model('TourPackage', tourPackageSchema);
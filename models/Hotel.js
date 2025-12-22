const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  address: String,
  amenities: [String],
  priceRange: { type: String, required: true },
  photos: [String],
  rating: { type: Number, min: 1, max: 5 }
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  airline: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  date: { type: String, required: true },        // e.g. "2025-12-25"
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Flight', flightSchema);
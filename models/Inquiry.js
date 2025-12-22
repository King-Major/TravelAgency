const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  inquiryType: {
    type: String,
    required: true,
    enum: ['flight', 'hotel', 'tour', 'visa', 'custom-trip', 'general']
  },
  destinations: [String],
  travelDates: String,
  travelersCount: Number,
  budget: String,
  tripPurpose: String,
  preferredFlight: String,
  needTour: String,
  visaCountry: String,
  visaType: String,
  specialRequests: String,
  status: {
    type: String,
    enum: ['new', 'contacted', 'quoted', 'booked', 'lost'],
    default: 'new'
  },
  replied: { type: Boolean, default: false },
  adminNotes: {
  type: String,
  default: ''
},
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
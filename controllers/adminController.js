const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const TourPackage = require('../models/TourPackage');

// ======================
// FLIGHT OPERATIONS
// ======================

exports.createFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Flight added successfully',
      data: flight
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add flight',
      error: error.message
    });
  }
};

exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find({ isAvailable: true }).sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    res.status(200).json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Flight updated successfully',
      data: flight
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Flight deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ======================
// HOTEL OPERATIONS
// ======================

exports.createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Hotel added successfully',
      data: hotel
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add hotel',
      error: error.message
    });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const { destination } = req.query;
    const query = destination ? { destination: { $regex: destination, $options: 'i' } } : {};
    
    const hotels = await Hotel.find(query).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Hotel updated successfully',
      data: hotel
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: 'Hotel not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ======================
// TOUR PACKAGE OPERATIONS
// ======================

exports.createTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Tour package added successfully',
      data: tour
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add tour package',
      error: error.message
    });
  }
};

exports.getAllTourPackages = async (req, res) => {
  try {
    const { featured } = req.query;
    const query = featured === 'true' ? { isFeatured: true } : {};
    
    const tours = await TourPackage.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTourPackageById = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.status(200).json({ success: true, data: tour });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Tour package updated successfully',
      data: tour
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Tour package deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


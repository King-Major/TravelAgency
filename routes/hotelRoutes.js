const express = require('express');
const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel
} = require('../controllers/adminController');

const router = express.Router();

// Admin
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

// Public (with optional destination filter: ?destination=Dubai)
router.get('/', getAllHotels);
router.get('/:id', getHotelById);

module.exports = router;
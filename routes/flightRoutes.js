const express = require('express');
const {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight
} = require('../controllers/adminController');

const router = express.Router();

// Admin routes (you can protect these later with auth middleware)
// POST   /api/flights       → create
// PUT    /api/flights/:id   → update
// DELETE /api/flights/:id   → delete
router.post('/', createFlight);
router.put('/:id', updateFlight);
router.delete('/:id', deleteFlight);

// Public routes (for website display)
router.get('/', getAllFlights);
router.get('/:id', getFlightById);

module.exports = router;
const express = require('express');
const {
  createTourPackage,
  getAllTourPackages,
  getTourPackageById,
  updateTourPackage,
  deleteTourPackage
} = require('../controllers/adminController');

const router = express.Router();

// Admin
router.post('/', createTourPackage);
router.put('/:id', updateTourPackage);
router.delete('/:id', deleteTourPackage);

// Public (with optional ?featured=true filter)
router.get('/', getAllTourPackages);
router.get('/:id', getTourPackageById);

module.exports = router;
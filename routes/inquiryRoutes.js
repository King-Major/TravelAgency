const express = require('express');
const { submitInquiry, getAllInquiries, updateInquiryStatus} = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', submitInquiry);

router.get('/', getAllInquiries);
router.patch('/:id', updateInquiryStatus);

module.exports = router;
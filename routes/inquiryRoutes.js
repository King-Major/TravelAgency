const express = require('express');
const { deleteInquiry, submitInquiry, getAllInquiries, updateInquiryStatus} = require('../controllers/inquiryController');

const router = express.Router();

router.post('/', submitInquiry);


router.get('/', getAllInquiries);
router.patch('/:id', updateInquiryStatus);

router.delete('/:id', deleteInquiry);

module.exports = router;
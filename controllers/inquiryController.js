const Inquiry = require('../models/Inquiry');
const { sendAdminEmail, sendAutoReply } = require('../utils/email');

exports.submitInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);

    // Fire and forget emails (don't block response)
    sendAdminEmail(inquiry).catch(console.error);
    sendAutoReply(inquiry).catch(console.error);

    res.status(201).json({
      success: true,
      message: "Thank you! We have received your request and will contact you within 24 hours."
    });
  } catch (error) {
    console.error('Inquiry error:', error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again."
    });
  }
};


exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .sort({ createdAt: -1 })  // newest first
      .select('-__v');         // hide mongo junk

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inquiries',
      error: error.message
    });
  }
};

// Add this function at the bottom of inquiryController.js

exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        adminNotes,
        replied: true  // mark as replied when status changes
      },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry updated successfully',
      data: updatedInquiry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead'); // Import your new database model

router.post('/', async (req, res) => {
  try {
    const { name, email } = req.body;

    // 1. Validate the input
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // 2. Check if the user already grabbed the discount
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return res.status(400).json({ message: 'This email has already claimed a discount!' });
    }

    // 3. Save the new lead to MongoDB
    const newLead = new Lead({ name, email });
    await newLead.save();

    res.status(201).json({ message: 'Lead saved successfully' });
    
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Server error saving lead' });
  }
});

module.exports = router;
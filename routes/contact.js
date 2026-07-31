const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/contact — public
router.post('/', async (req, res) => {
  try {
    const { name, email, message, budget } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'name, email, and message are required' });
    }

    const contact = await ContactMessage.create({ name, email, message, budget });
    res.status(201).json({ message: 'Message received', id: contact._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to save message', error: error.message });
  }
});

// GET /api/contact — protected (admin inbox)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

module.exports = router;

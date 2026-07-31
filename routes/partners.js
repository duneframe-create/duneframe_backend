const express = require('express');
const Partner = require('../models/Partner');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    res.json(await Partner.find().sort({ order: 1, createdAt: 1 }));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch partners', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    res.status(201).json(await Partner.create(req.body));
  } catch (error) {
    res.status(400).json({ message: 'Failed to create partner', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json(partner);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update partner', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) return res.status(404).json({ message: 'Partner not found' });
    res.json({ message: 'Partner deleted', id: partner._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete partner', error: error.message });
  }
});

module.exports = router;

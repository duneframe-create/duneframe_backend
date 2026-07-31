const express = require('express');
const Award = require('../models/Award');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    res.json(await Award.find().sort({ order: 1, createdAt: 1 }));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch awards', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    res.status(201).json(await Award.create(req.body));
  } catch (error) {
    res.status(400).json({ message: 'Failed to create award', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!award) return res.status(404).json({ message: 'Award not found' });
    res.json(award);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update award', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const award = await Award.findByIdAndDelete(req.params.id);
    if (!award) return res.status(404).json({ message: 'Award not found' });
    res.json({ message: 'Award deleted', id: award._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete award', error: error.message });
  }
});

module.exports = router;

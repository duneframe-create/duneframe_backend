const express = require('express');
const Principle = require('../models/Principle');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/principles
router.get('/', async (req, res) => {
  try {
    const principles = await Principle.find().sort({ order: 1, createdAt: 1 });
    res.json(principles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch principles', error: error.message });
  }
});

// POST /api/principles — protected
router.post('/', auth, async (req, res) => {
  try {
    const principle = await Principle.create(req.body);
    res.status(201).json(principle);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create principle', error: error.message });
  }
});

// PUT /api/principles/:id — protected
router.put('/:id', auth, async (req, res) => {
  try {
    const principle = await Principle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!principle) {
      return res.status(404).json({ message: 'Principle not found' });
    }

    res.json(principle);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update principle', error: error.message });
  }
});

// DELETE /api/principles/:id — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    const principle = await Principle.findByIdAndDelete(req.params.id);

    if (!principle) {
      return res.status(404).json({ message: 'Principle not found' });
    }

    res.json({ message: 'Principle deleted', id: principle._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete principle', error: error.message });
  }
});

module.exports = router;

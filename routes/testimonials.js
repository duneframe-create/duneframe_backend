const express = require('express');
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    res.json(await Testimonial.find().sort({ order: 1, createdAt: 1 }));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    res.status(201).json(await Testimonial.create(req.body));
  } catch (error) {
    res.status(400).json({ message: 'Failed to create testimonial', error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update testimonial', error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Testimonial.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted', id: item._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete testimonial', error: error.message });
  }
});

module.exports = router;

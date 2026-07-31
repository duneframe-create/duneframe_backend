const express = require('express');
const TeamMember = require('../models/TeamMember');
const auth = require('../middleware/auth');

const router = express.Router();

// GET /api/team
router.get('/', async (req, res) => {
  try {
    const team = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team', error: error.message });
  }
});

// POST /api/team — protected
router.post('/', auth, async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team member', error: error.message });
  }
});

// PUT /api/team/:id — protected
router.put('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update team member', error: error.message });
  }
});

// DELETE /api/team/:id — protected
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({ message: 'Team member not found' });
    }

    res.json({ message: 'Team member deleted', id: member._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete team member', error: error.message });
  }
});

module.exports = router;

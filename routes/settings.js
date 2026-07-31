const express = require('express');
const SiteSettings = require('../models/SiteSettings');
const auth = require('../middleware/auth');

const router = express.Router();

async function getOrCreate() {
  let settings = await SiteSettings.findOne({ key: 'main' });
  if (!settings) {
    settings = await SiteSettings.create({ key: 'main' });
  }
  return settings;
}

// GET /api/settings — public
router.get('/', async (_req, res) => {
  try {
    res.json(await getOrCreate());
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch settings', error: error.message });
  }
});

// PUT /api/settings — protected
router.put('/', auth, async (req, res) => {
  try {
    const allowed = [
      'email',
      'phone',
      'addressLine1',
      'addressLine2',
      'hours',
      'clientsCount',
      'partnerAvatars',
      'heroVideoUrl',
      'heroPosterUrl',
      'introImages',
      'socials',
    ];
    const updates = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'main' },
      { $set: updates },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update settings', error: error.message });
  }
});

module.exports = router;

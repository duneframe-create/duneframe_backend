const express = require('express');
const Project = require('../models/Project');
const TeamMember = require('../models/TeamMember');
const Principle = require('../models/Principle');
const Award = require('../models/Award');
const Partner = require('../models/Partner');
const Testimonial = require('../models/Testimonial');
const Post = require('../models/Post');
const SiteSettings = require('../models/SiteSettings');
const connectDB = require('../db');

const router = express.Router();

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ key: 'main' }).lean();
  if (!settings) {
    settings = (await SiteSettings.create({ key: 'main' })).toObject();
  }
  return settings;
}

// GET /api/home — one round-trip for homepage content
router.get('/', async (_req, res) => {
  try {
    await connectDB();

    const [projects, team, principles, awards, partners, testimonials, posts, settings] =
      await Promise.all([
        Project.find({ featured: true }).sort({ order: 1, createdAt: -1 }).limit(4).lean(),
        TeamMember.find().sort({ order: 1, createdAt: 1 }).limit(4).lean(),
        Principle.find().sort({ order: 1, createdAt: 1 }).lean(),
        Award.find().sort({ order: 1, createdAt: 1 }).lean(),
        Partner.find().sort({ order: 1, createdAt: 1 }).lean(),
        Testimonial.find().sort({ order: 1, createdAt: 1 }).lean(),
        Post.find().sort({ order: 1, createdAt: -1 }).limit(6).lean(),
        getOrCreateSettings(),
      ]);

    res.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.json({
      projects,
      team,
      principles,
      awards,
      partners,
      testimonials,
      posts,
      settings,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load homepage', error: error.message });
  }
});

module.exports = router;

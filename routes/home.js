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

let cache = null;
let cacheAt = 0;
const CACHE_MS = 30_000;

async function getOrCreateSettings() {
  let settings = await SiteSettings.findOne({ key: 'main' })
    .select(
      'clientsCount partnerAvatars heroVideoUrl heroPosterUrl introImages email phone addressLine1 addressLine2 hours socials'
    )
    .lean();
  if (!settings) {
    settings = (await SiteSettings.create({ key: 'main' })).toObject();
  }
  return settings;
}

async function loadHomePayload() {
  const [projects, team, principles, awards, partners, testimonials, posts, settings] =
    await Promise.all([
      Project.find({ featured: true })
        .select('title slug category client year coverImage videoUrl description featured order')
        .sort({ order: 1, createdAt: -1 })
        .limit(4)
        .lean(),
      TeamMember.find()
        .select('name role photo quote bio order')
        .sort({ order: 1, createdAt: 1 })
        .limit(4)
        .lean(),
      Principle.find().select('title description icon order').sort({ order: 1, createdAt: 1 }).lean(),
      Award.find().select('year count badge title order').sort({ order: 1, createdAt: 1 }).lean(),
      Partner.find().select('name logoUrl order').sort({ order: 1, createdAt: 1 }).lean(),
      Testimonial.find()
        .select('quote name role photo order')
        .sort({ order: 1, createdAt: 1 })
        .lean(),
      Post.find()
        .select('tag title date image order')
        .sort({ order: 1, createdAt: -1 })
        .limit(6)
        .lean(),
      getOrCreateSettings(),
    ]);

  return { projects, team, principles, awards, partners, testimonials, posts, settings };
}

// GET /api/home — one round-trip for homepage content
router.get('/', async (_req, res) => {
  try {
    await connectDB();

    const now = Date.now();
    if (cache && now - cacheAt < CACHE_MS) {
      res.set('Cache-Control', 'public, max-age=15, s-maxage=60, stale-while-revalidate=300');
      res.set('X-Cache', 'HIT');
      return res.json(cache);
    }

    const payload = await loadHomePayload();
    cache = payload;
    cacheAt = now;

    res.set('Cache-Control', 'public, max-age=15, s-maxage=60, stale-while-revalidate=300');
    res.set('X-Cache', 'MISS');
    res.json(payload);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load homepage', error: error.message });
  }
});

module.exports = router;

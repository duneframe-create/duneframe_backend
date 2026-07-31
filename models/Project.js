const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Commercial', 'Documentary', 'MusicVideo', 'Branding', 'Other'],
      required: true,
    },
    client: {
      type: String,
      trim: true,
      default: '',
    },
    year: {
      type: Number,
    },
    coverImage: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

projectSchema.pre('validate', async function generateSlug(next) {
  if (!this.isModified('title') && this.slug) {
    return next();
  }

  const base = slugify(this.title) || 'project';
  let candidate = base;
  let counter = 1;

  // Ensure uniqueness when creating or renaming
  while (true) {
    const existing = await mongoose.models.Project.findOne({
      slug: candidate,
      _id: { $ne: this._id },
    });

    if (!existing) {
      this.slug = candidate;
      break;
    }

    candidate = `${base}-${counter++}`;
  }

  next();
});

module.exports = mongoose.model('Project', projectSchema);

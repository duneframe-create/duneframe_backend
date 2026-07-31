const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: 'main' },
    email: { type: String, default: 'hello@studio.example', trim: true },
    phone: { type: String, default: '+(084) 123 - 456 88', trim: true },
    addressLine1: { type: String, default: '401 Broadway, 24th Floor', trim: true },
    addressLine2: { type: String, default: 'Orchard View, London', trim: true },
    hours: { type: String, default: 'Mon–Fri, 10:00 – 18:00', trim: true },
    clientsCount: { type: String, default: '25k+', trim: true },
    partnerAvatars: { type: [String], default: [] },
    heroVideoUrl: {
      type: String,
      default: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      trim: true,
    },
    heroPosterUrl: {
      type: String,
      default:
        'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1800',
      trim: true,
    },
    introImages: {
      type: [String],
      default: [
        'https://images.pexels.com/photos/1209611/pexels-photo-1209611.jpeg?auto=compress&cs=tinysrgb&w=900',
        'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=900',
        'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=900',
      ],
    },
    socials: {
      type: [
        {
          label: { type: String, trim: true },
          href: { type: String, trim: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);

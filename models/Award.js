const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema(
  {
    year: { type: String, default: '', trim: true },
    count: { type: String, default: 'x1', trim: true },
    badge: { type: String, default: '', trim: true },
    title: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Award', awardSchema);

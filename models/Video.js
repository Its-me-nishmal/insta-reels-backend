const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoUrl: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);

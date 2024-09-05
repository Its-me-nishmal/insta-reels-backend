const Video = require('../models/Video');

// Fetch paginated videos
exports.getPaginatedVideos = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const videos = await Video.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalVideos = await Video.countDocuments();
    res.json({
      videos,
      currentPage: page,
      totalPages: Math.ceil(totalVideos / limit),
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// Like a video
exports.likeVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.likes += 1;
    await video.save();
    res.json({ message: 'Video liked', likes: video.likes });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.addVideos = async (req, res) => {
    const { videoUrls } = req.body;
  
    if (!videoUrls || !Array.isArray(videoUrls) || videoUrls.length === 0) {
      return res.status(400).json({ error: 'An array of video URLs is required' });
    }
  
    try {
      const videos = await Video.insertMany(
        videoUrls.map(videoUrl => ({ videoUrl }))
      );
      
      res.status(201).json({
        message: 'Videos added successfully',
        videos: videos
      });
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
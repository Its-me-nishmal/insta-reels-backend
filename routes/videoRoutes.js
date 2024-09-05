const express = require('express');
const { getPaginatedVideos, likeVideo, addVideos } = require('../controllers/videoController');
const router = express.Router();

router.get('/videos', getPaginatedVideos);
router.put('/videos/:id/like', likeVideo);
router.post('/videos/add',addVideos)

module.exports = router;

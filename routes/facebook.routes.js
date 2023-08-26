const express = require('express')
const facebook = require('../controller/facebook.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

// router.post('/download-channel',verifyToken,youtube.upload_channel)
router.post('/download-video',facebook.get_video_link)
module.exports = router;
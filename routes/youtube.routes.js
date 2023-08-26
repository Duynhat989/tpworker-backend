const express = require('express')
const youtube = require('../controller/youtube.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/download-channel',verifyToken,youtube.upload_channel)
router.post('/download-video',youtube.upload_link)
router.post('/download-video-test',youtube.upload_link_test)
router.post('/download-channel-test',youtube.upload_chanel_test)
module.exports = router;
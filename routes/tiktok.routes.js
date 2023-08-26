const express = require('express')
const tiktok = require('../controller/tiktok.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/download-video',tiktok.upload_link)
module.exports = router;
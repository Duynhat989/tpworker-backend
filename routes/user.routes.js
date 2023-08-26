const express = require('express')
const controler = require('../controller/auth.controller')
const verifyToken = require('../midleware/auth')
const router = express.Router()

router.post('/login',controler.login)
router.post('/register',controler.register)
router.post('/info',verifyToken,controler.info)
router.post('/avaliable',verifyToken,controler.avaliable)
module.exports = router;
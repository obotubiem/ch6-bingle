const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth_controller')
const handleUpload = require('../libs/handle_Upload')

router.post('/register', handleUpload.upload.single('avatar'), authController.register)
router.post('/login', authController.login)
router.get('/auth/user', authController.user)

module.exports = router
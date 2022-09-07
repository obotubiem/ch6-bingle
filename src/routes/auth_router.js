const express =require('express')
const router = express.Router()
const auth = require('../controllers/auth_controller')
const handleUpload =require('../libs/handle_Upload')

router.post('/login', auth.login)
router.post('/register', handleUpload.single('photo_profile'),auth.register)


module.exports = router
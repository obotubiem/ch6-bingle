const express =require('express')
const router = express.Router()
const auth = require('../../controllers/auth_controller')
const handleUpload =require('../../libs/handle_Upload')

router.post('/login',handleUpload.single('photo_profile'), auth.login)
router.post('/register', auth.register)


module.exports = router
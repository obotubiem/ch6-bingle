const express =require('express')
const router = express.Router()
const auth = require('../controllers/auth_controller')
const handleUpload =require('../libs/handle_Upload')

router.post('/register',handleUpload.upload.single('avatar'), auth.register)
router.post('/login', auth.login)


module.exports = router
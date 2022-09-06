const express =require('express')
const router = express.Router()
const auth = require('../../controllers/auth_controller')

router.post('/login', auth.login)


module.exports = router
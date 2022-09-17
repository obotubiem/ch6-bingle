const express = require('express')
const router = express.Router()
const address = require('../controllers/admin_address_controller')

router.get('/customer', address.getAddress)

module.exports= router
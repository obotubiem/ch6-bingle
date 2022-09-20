const express = require('express')
const router = express.Router()
const address = require('../controllers/address_controller')

router.get('/customer', address.getAddress)
router.get('/customer/:id', address.getOneAddress)

module.exports= router
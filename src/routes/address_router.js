const express = require('express')
const router = express.Router()
const address = require('../controllers/address_controller')

router.get('/customer', address.getAddress)
router.post('/customer/user', address.getAddressByUserID)
router.post('/customer/add', address.addAddress)
router.put('/customer/update', address.editAddres)
router.delete('/customer/:id', address.deleteAddress)

module.exports= router
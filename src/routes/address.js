const express = require('express')
const router = express.Router()
const address = require('../controllers/admin_address_controller')

router.get('/customer', address.getAddress)
router.get('/customer/:id', address.getOneAddress)
router.post('/customer/add', address.addAddress)
router.put('/customer/update', address.editAddres)
router.delete('/customer/:id', address.deleteAddress)

module.exports= router
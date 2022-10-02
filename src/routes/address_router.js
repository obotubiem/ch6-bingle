const express = require('express')
const router = express.Router()
const address = require('../controllers/address_controller')

router.get('/customer/user/:user_id', address.getAddressByUserID)
router.post('/customer/add', address.addAddress)
router.put('/customer/update/:id', address.editAddres)
router.delete('/customer/delete/:id', address.deleteAddress)

module.exports= router
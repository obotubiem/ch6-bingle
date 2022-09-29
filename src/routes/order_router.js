const express = require('express')
const router = express.Router()
const order = require('../controllers/order_controller')

router.get('/', order.getOrder)
router.get('/user/:id', order.getOrder)
router.post('/user/order/:id', order.createOrder)

module.exports = router
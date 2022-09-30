const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const order = require('../controllers/order_controller')

router.get('/', auth.authorization, order.getOrder)
router.post('/', auth.authorization, order.createOrder)

router.get('/user/:id', order.getOrder)
router.post('/user/order/:id', order.createOrder)

module.exports = router
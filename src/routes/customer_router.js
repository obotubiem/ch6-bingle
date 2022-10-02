const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const handleUpload =require("../libs/handle_Upload")
const user_controller = require('../controllers/user_controller')
const address_controller = require('../controllers/address_controller')
const product_controller = require('../controllers/product_controller')
const category_controller = require('../controllers/category_controller')
const order_controller = require('../controllers/order_controller')

// user
router.put('/update-profile/:id' ,user_controller.editUser)




// product
router.get('/product',product_controller.getAllProduct)
router.get('/product/:id', product_controller.getOneProduct)


// category
router.get('/category',category_controller.getAllCategory)
router.get('/category/product/:id',category_controller.getProductByCategory)
router.get('/category/:id', category_controller.getOneCategory)


// address
router.get('/address/:user_id', address_controller.getAddressByUserID)
router.post('/address/add', address_controller.addAddress)
router.put('/address/update/:id', address_controller.editAddres)
router.delete('/address/delete/:id', address_controller.deleteAddress)

// Order
router.get('/order', auth.authorization, order_controller.getOrder)
router.post('/order/add/:id', auth.authorization, order_controller.createOrder)

module.exports = router
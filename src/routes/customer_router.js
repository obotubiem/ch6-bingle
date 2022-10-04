const express = require('express')
const router = express.Router()
const handleUpload =require("../libs/handle_Upload")
const user_controller = require('../controllers/user_controller')
const address_controller = require('../controllers/address_controller')
const product_controller = require('../controllers/product_controller')
const category_controller = require('../controllers/category_controller')
const order_controller = require('../controllers/order_controller')
const authorized = require('../middleware/auth')

// user
router.put('/update-profile/',authorized.customer ,user_controller.editUser)




// product
router.get('/product',product_controller.getAllProduct)
router.get('/product/:id', product_controller.getOneProduct)


// category
router.get('/category',category_controller.getAllCategory)
router.get('/category/product/:id',category_controller.getProductByCategory)
router.get('/category/:id', category_controller.getOneCategory)


// address
router.get('/address/',authorized.customer, address_controller.getAddressByUserID)
router.post('/address/add',authorized.customer, address_controller.addAddress)
router.put('/address/update/:id',authorized.customer, address_controller.editAddres)
router.delete('/address/delete/:id',authorized.customer, address_controller.deleteAddress)

// Order
router.get('/order',authorized.customer, order_controller.getOrder)
router.post('/order/add/:id',authorized.customer, order_controller.createOrder)

module.exports = router
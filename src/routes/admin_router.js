const express = require('express')
const router = express.Router()
const product = require("../controllers/product_controller")
const category = require ("../controllers/category_controller")
const user = require('../controllers/user_controller')
const address = require("../controllers/address_controller")
const handleUpload =require("../libs/handle_Upload")

router.get('/user',user.getAllUser)

router.post('/product/add',handleUpload.upload.single('image') ,product.addProduct)
router.put('/product/update/:id',handleUpload.upload.single('image'), product.editProduct)
router.delete('/product/delete/:id', product.deleteProduct)


router.post('/category/add' ,category.addCategory)
router.put('/category/update/:id', category.editCategory)
router.delete('/category/delete/:id', category.deleteCategory)

// address 
router.post('/customer/add', address.addAddress)
router.put('/customer/update', address.editAddres)
router.delete('/customer/:id', address.deleteAddress)


module.exports=router


const express = require('express')
const router = express.Router()
const product = require("../controllers/product_controller")
const category = require ("../controllers/category_controller")
const user = require('../controllers/user_controller')
const handleUpload =require("../libs/handle_Upload")

// user
router.get('/user',user.getAllUser)
router.get('/user/:id', user.getUserByID)

// Product
router.post('/product/add',handleUpload.upload.single('image') ,product.addProduct)
router.put('/product/update/:id',handleUpload.upload.single('image'), product.editProduct)
router.delete('/product/delete/:id', product.deleteProduct)

// Category
router.post('/category/add' ,category.addCategory)
router.put('/category/update/:id', category.editCategory)
router.delete('/category/delete/:id', category.deleteCategory)


module.exports=router


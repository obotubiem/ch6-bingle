const express = require('express')
const router = express.Router()
const product = require("../controllers/product_controller")
const category = require ("../controllers/category_controller")
const user = require('../controllers/user_controller')
const imageProduct_controller = require("../controllers/image_product_controller")
const handleUpload =require("../libs/handle_Upload")
const authorized = require("../middleware/auth")

// user
router.get('/user', authorized.admin,user.getAllUser)
router.get('/user/:id',authorized.admin, user.getUserByID)

// Product
router.post('/product/add',authorized.admin, handleUpload.upload.single('image') ,product.addProduct)
router.put('/product/update/:id',authorized.admin,handleUpload.upload.single('image'), product.editProduct)
router.delete('/product/delete/:id',authorized.admin, product.deleteProduct)

// image product
router.post('/image/add',handleUpload.upload.single('url'), imageProduct_controller.createImageProduct)
router.put('/image/update/:id',handleUpload.upload.single('url'), imageProduct_controller.updateImageProduct)
router.delete('/image/delete/:id', imageProduct_controller.deleteImageProduct)

// Category
router.post('/category/add' ,authorized.admin, category.addCategory)
router.put('/category/update/:id',authorized.admin, category.editCategory)
router.delete('/category/delete/:id',authorized.admin, category.deleteCategory)


module.exports=router


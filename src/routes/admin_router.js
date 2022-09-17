const express = require('express')
const router = express.Router()
const admin = require("../controllers/admin_controller")
const user = require('../controllers/admin_user_controller')
const handleUpload =require("../libs/handle_Upload")
const {authentication, authorization } = require('../middleware/auth')

router.get('/user',user.getAllUser)

router.post('/product/add',handleUpload.upload.single('image') ,admin.addProduct)
router.put('/product/update/:id',handleUpload.upload.single('image'), admin.editProduct)
router.delete('/product/delete/:id', admin.deleteProduct)


router.post('/category/add' ,admin.addCategory)
router.put('/category/update/:id', admin.editCategory)
router.delete('/category/delete/:id', admin.deleteCategory)


module.exports=router


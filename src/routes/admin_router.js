const express = require('express')
const router = express.Router()
const admin = require("../controllers/admin_controller")
const handleUpload =require("../libs/handle_Upload")


router.post('/product/add',handleUpload.single('photo_product') ,admin.addProduct)
router.put('/product/update/:id', admin.editProduct)
router.delete('/product/delete/:id', admin.editProduct)



module.exports=router


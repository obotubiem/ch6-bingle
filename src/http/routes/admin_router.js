const express = require('express')
const router = express.Router()
const admin = require('../../controllers/admin_controller')


router.post('/product/add', admin.addProduct)
router.put('/product/update/:id', admin.editProduct)
router.delete('/product/delete/:id', admin.editProduct)



module.exports=router


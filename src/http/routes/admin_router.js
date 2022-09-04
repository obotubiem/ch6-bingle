const express = require('express')
const router = express.Router()
const admin = require('../../controllers/admin_controller')


router.post('/product/add', admin.addProduct)



module.exports=router


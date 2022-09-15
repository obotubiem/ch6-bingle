const express = require('express')
const router = express.Router()
const product = require('../controllers/product_controller')
const {authentication, authorization } = require('../middleware/auth')


router.get('/',authorization,product.getAllProduct)
router.get('/:id', product.getOneProduct)



module.exports=router
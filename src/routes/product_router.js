const express = require('express')
const router = express.Router()
const product = require('../controllers/product_controller')


router.get('/', product.getAllProduct)
router.get('/:id', product.getOneProduct)


module.exports=router


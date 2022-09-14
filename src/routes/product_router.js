const express = require('express')
const passport = require('../libs/passport')
const router = express.Router()
const product = require('../controllers/product_controller')
const isAdmin = require('../middleware/auth')


router.get('/',product.getAllProduct)
router.get('/:id', product.getOneProduct)



module.exports=router
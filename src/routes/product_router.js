const express = require('express')
const passport = require('passport')
const router = express.Router()
const product = require('../controllers/product_controller')


router.get('/',passport.authenticate("jwt", {session: false}) ,product.getAllProduct)
router.get('/:id', product.getOneProduct)


module.exports=router


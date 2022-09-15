const express = require('express')
const router = express.Router()
const category = require('../controllers/category_controller')


router.get('/',category.getAllCategory)
router.get('/product/:id',category.getProductByCategory)
router.get('/:id', category.getOneCategory)



module.exports=router
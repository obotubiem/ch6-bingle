const express = require('express')
const passport = require('../libs/passport')
const router = express.Router()
const category = require('../controllers/category_controller')


router.get('/',category.getAllCategory)

router.get('/:id', category.getOneCategory)



module.exports=router
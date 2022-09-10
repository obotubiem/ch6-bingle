const express = require('express')
const passport = require('../libs/passport')
const router = express.Router()
const category = require('../controllers/category_controller')


router.get('/',passport.authenticate("jwt", {session:false}) ,category.getAllCategory)

router.get('/:id',passport.authenticate("jwt", {session: false}), category.getOneCategory)



module.exports=router
const express = require('express')
const router = express.Router()
const admin = require("../controllers/admin_controller")
const handleUpload =require("../libs/handle_Upload")
const passport = require ("../libs/passport")


router.post('/product/add',passport.authenticate("jwt", {session: false}) ,handleUpload.single('photo_product') ,admin.addProduct)
router.put('/product/update/:id',passport.authenticate("jwt", {session: false}) , admin.editProduct)
router.delete('/product/delete/:id',passport.authenticate("jwt", {session: false}) , admin.deleteProduct)


router.post('/category/add',passport.authenticate("jwt", {session: false}) ,handleUpload.single('photo_product') ,admin.addCategory)
router.put('/category/update/:id',passport.authenticate("jwt", {session: false}) , admin.editCategory)
router.delete('/category/delete/:id',passport.authenticate("jwt", {session: false}) , admin.deleteCategory)


module.exports=router


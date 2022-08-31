const express = require('express')
const router = express.Router()
const prodcut = require('../controllers/product_controller')

router.get('/', prodcut.getOneProduct)
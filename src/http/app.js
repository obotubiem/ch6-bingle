const express = require('express')
const app = express()


app.use(express.json())
const ProductRepository = require("../repository/product")
const ItemUseCase = require("../usecase/item")

const productRouter = require("./routes/product_router")
const adminRouter = require("./routes/admin_router")

const itemUC = new ItemUseCase(new ProductRepository())

app.use((req, res, next)=>{
    req.itemUC = itemUC
    next()
})
app.get('/', (req, res)=>{
    res.json("test")
}) 


app.use('/product', productRouter)
app.use('/admin', adminRouter)






module.exports = app
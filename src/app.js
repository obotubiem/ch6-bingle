const express = require('express')
const app = express()
const passport= require("./libs/passport")


app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const ProductRepository = require("./repository/product")
const ItemUseCase = require("./usecase/item")
const UserRepository =require("./repository/user")
const UserUseCase = require("./usecase/user")

const productRouter = require("./routes/product_router")
const adminRouter = require("./routes/admin_router")
const authRouter = require("./routes/auth_router")




const itemUC = new ItemUseCase(new ProductRepository())
const userUC = new UserUseCase(new UserRepository())

app.use((req, res, next)=>{
    req.itemUC = itemUC
    req.userUC = userUC
    next()
})
app.get('/', (req, res)=>{
    res.json("test")
}) 

app.use(passport.initialize())
app.use('/product', productRouter)
app.use('/admin', adminRouter)
app.use('/', authRouter)





module.exports = app
const express = require('express')
const app = express()
const passport= require("./src/libs/passport")


app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const ProductRepository = require("./src/repository/product")
const ItemUseCase = require("./src/usecase/item")
const CategoryUseCase = require("./src/usecase/category")
const CategoryRepository =require("./src/repository/category")
const UserRepository =require("./src/repository/user")
const UserUseCase = require("./src/usecase/user")

const productRouter = require("./src/routes/product_router")
const categoryRouter = require("./src/routes/category_router")
const adminRouter = require("./src/routes/admin_router")
const authRouter = require("./src/routes/auth_router")



const categoryUC = new CategoryUseCase(new CategoryRepository())
const itemUC = new ItemUseCase(new ProductRepository())
const userUC = new UserUseCase(new UserRepository())

app.use((req, res, next)=>{
    req.itemUC = itemUC
    req.categoryUC = categoryUC
    req.userUC = userUC
    next()
})
app.get('/', (req, res)=>{
    res.json("test")
}) 

app.use(passport.initialize())
app.use('/product', productRouter)
app.use('/category', categoryRouter)
app.use('/admin', adminRouter)
app.use('/', authRouter)

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/docs/docs.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))




module.exports = app
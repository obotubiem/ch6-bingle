const express = require('express')
const app = express()

app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const ProductRepository = require("./src/repository/product")
const ItemUseCase = require("./src/usecase/product")

const CategoryRepository = require("./src/repository/category")
const CategoryUseCase = require("./src/usecase/category")

const UserRepository = require("./src/repository/user")
const UserUseCase = require("./src/usecase/user")

const AddressUseCase = require("./src/usecase/address")
const AddressRepository = require("./src/repository/address")

const OrderUseCase = require("./src/usecase/order")
const OrderRepository = require("./src/repository/order")
const OrderDetailRepository = require("./src/repository/orderDetail")

const adminRouter = require("./src/routes/admin_router")
const customerRouter = require("./src/routes/customer_router")
const authRouter = require("./src/routes/auth_router")

const userUC = new UserUseCase(new UserRepository())
const addressUC = new AddressUseCase(
    new AddressRepository(),
    new UserRepository()
)
const categoryUC = new CategoryUseCase(new CategoryRepository())
const itemUC = new ItemUseCase(
    new ProductRepository(),
    new CategoryRepository()
)
const orderUC = new OrderUseCase(
    new OrderRepository(),
    new OrderDetailRepository(),
    new ProductRepository()
)

app.use((req, res, next) => {
    req.itemUC = itemUC
    req.categoryUC = categoryUC
    req.userUC = userUC
    req.addressUC = addressUC
    req.orderUC = orderUC
    next()
})
app.get('/', (req, res) => {
    res.json("test")
})

app.use('/admin', adminRouter)
app.use('/customer', customerRouter)
app.use('/', authRouter)

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./src/docs/docs.json')


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


module.exports = app
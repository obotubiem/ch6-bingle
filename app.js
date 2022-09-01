const express = require('express')
const app = express()
const path =require('path')


app.use(express.json())
const productRouter= require('./src/controllers/product_controller')
app.use('/product', productRouter)

app.get('/', (req, res)=>{
    res.json("test server")
})


const port =8080

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`)
})
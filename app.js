const express = require('express')
const app = express()
const path =require('path')


app.use(express.json())
const productRouter= require('./src/routes/product_router')

app.get('/', (req, res)=>{
    res.json("test server")
})
app.use('/product', productRouter)


const port =8080

app.listen(port, ()=>{
    console.log(`server runing on port ${port}`)
})
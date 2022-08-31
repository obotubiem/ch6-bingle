
const express = require('express')
const app = express()
const path =require('path')



const itemRepository = require('./src/repository/item');
const Item = require('./src/usecase/item');

item = new Item(new itemRepository())
item.getProductByID(1).then(res =>{
    console.log(res)
})
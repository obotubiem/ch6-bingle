const res_data = require('../helper/respons_data')
const { v4: uuidv4 } = require('uuid');
const url =require('../libs/handle_Upload');
const user = require('../database/models/user');

module.exports = {
addProduct : async (req, res, next)=>{
    try {
        let product ={
            id:uuidv4(),
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            sold : req.body.sold,
            description : req.body.description,
            image: await url.uploadCloudinary(req.file.path),
            category_id: req.body.category_id,
        
        } 
        
        let create_res = await req.itemUC.createProduct(product)
        let checkExistCategory = await req.categoryUC.getCategoryByID(product.category_id)
        if(checkExistCategory == null){
            return res
            .status(400)
            .json(res_data.failed('failed, category not found please insert category corectly'))
        }
        
        if(create_res.is_success !==true){
            return res
           .status(400)
           .json(res_data.failed('create data failed'), null)
        }

        res.json(res_data.success(product))
        
    } catch (error) {
        next(error)
    }
},

editProduct : async (req, res, next) => {
    try {
        let id = req.params.id
        let product ={
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            sold : req.body.sold,
            description : req.body.description,
            image: req.file.filename,
            category_id: req.body.category_id,
        
        } 
        let update_res = await req.itemUC.updateProduct(product, id)
        if(update_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed('update data failed'))
        }
        res.json(res_data.success(product))


    } catch (error) {
        next(error)
    }

},

deleteProduct : async (req, res, next)=>{
    try {
        let id = req.params.id
        let check_Data = await req.itemUC.getProductByID(id)
        if(!check_Data) {
            return  res.status(404).json(res_data.failed('data not found', null))
        }
        let delete_res = await req.itemUC.deleteProduct(id)
        if(delete_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed ('delete data failed'))
        }
        res.json(res_data.success('succes delete product'))
    } catch (error) {
        next(error)
    }
},

addCategory : async (req, res, next)=>{
    try {
        let category = req.body
        let create_res = await req.categoryUC.createCategory(category)
        if(create_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed ('add category failed'),null)
      }
        return res.status(200).json(res_data.success(category))
    } catch (error) {
        next(error)
    }
},

editCategory : async (req, res, next)=>{
    try {
        let id = req.params.id
        let category = req.body
        
        let check_Data = await req.categoryUC.getCategoryByID(id)
        if(check_Data == null) {
            return  res.status(404).json(res_data.failed('data not found', null))
        }
        let update_res = await req.categoryUC.updateCategory(category, id)
        if(update_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed('update data failed'))
        }
        res.json(res_data.success(category))


    } catch (error) {
        next(error)
    }
},
deleteCategory : async (req, res, next)=>{
    try {
        let id = req.params.id
        
        let check_Data = await req.categoryUC.getCategoryByID(id)
        if(check_Data == null) {
            return  res.status(404).json(res_data.failed('data not found', null))
        }
        let delete_res = await req.categoryUC.deleteCategory(id)
        if(delete_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed ('delete data failed'))
        }
        res.json(res_data.success('succes delete product'))
    } catch (error) {
        next(error)
    }
}
}
const res_data = require('../utils/respons_data')

exports.addProduct  = async (req, res, next)=>{
    try {
        let product ={
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category_id: req.body.category_id,
            photo_product: req.file.filename
        
        } 
        let create_res = await req.itemUC.createProduct(product)
        if(create_res.is_success !==true){
            return res
           .status(400)
           .json(res_data.failed('create data failed'), null)
        }
        res.json(res_data.success(product))
        
    } catch (error) {
        next(error)
    }
}

exports.editProduct = async (req, res, next) => {
    try {
        let id = req.params.id
        let product = req.body
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

}

exports.deleteProduct = async (req, res, next)=>{
    try {
        let id = req.params.id
        let delete_res = await req.itemUC.deleteProduct(id)
        if(delete_res.is_success !== true){
            return res
            .status(400)
            .json(res_data.failed, ('delete data failed'))
        }
        res.json(res_data.success(delete_res))
    } catch (error) {
        next(error)
    }
}
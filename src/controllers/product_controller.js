const res_data = require('../utils/respons_data')

exports.getAllProduct = async (req, res, next)=>{
   try {
       let product = await req.itemUC.getProducts()
       if(product ==null || 'undefined'){
           return res
           .status(400)
           .json(res_data.failed('Item not found', product))
       }
       res.json(res_data.success(product))
    
   } catch (error) {
            next(error)    
   }   
}

exports.getOneProduct = async (req, res, next)=>{
    try {
        let id = req.params.id
        let product = await req.itemUC.getProductByID(id)
        if(product ==null){
            return res
            .status(400)
            .json(res_data.failed('Product not found', product))
        }

        res.status(200).json(res_data.success(product))
    } catch (error) {
        next(error)
    }
}

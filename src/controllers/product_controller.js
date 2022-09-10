const res_data = require('../utils/respons_data')


module.exports = {


getAllProduct : async (req, res, next)=>{
   try {
       let product = await req.itemUC.getProducts()
       if(product.length === 0){
           return res
           .status(400)
           .json(res_data.failed('Item not found', product))
        } else
        res.json(res_data.success(product))
        
        
    } catch (error) {
            next(error)    
   }   
},

getOneProduct : async (req, res, next)=>{
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
}
const res_data = require('../utils/respons_data')

exports.addProduct  = async (req, res, next)=>{
    try {
        let product = req.body
        let create_res = await req.itemUC.createProduct(product)
        if(create_res.is_success !==true){
            return res
           .status(400)
           .json(res_data.failed, 'create data failed', product)
        }
        res.json(res_data.success(product))
        
    } catch (error) {
        next(error)
    }
}
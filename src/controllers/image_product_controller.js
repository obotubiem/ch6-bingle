const res_data = require("../helper/respons_data");

module.exports = {
    getImageProductByProductID : async (req, res, next)=>{
        product_id = req.product.id
        try {
            let res_imageProduct = await req.imageProductUC.getImageProductByProductID(product_id)
            if(res_imageProduct.is_success !== true){
                return res
                .status(404)
                .json(res_data.failed(res_imageProduct.message))
            }
            res.status(200).json(res_data.success(res_imageProduct.image))
        } catch (e) {
            next(e)
        }
    }
}
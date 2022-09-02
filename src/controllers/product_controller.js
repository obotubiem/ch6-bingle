const res_data = require('../utils/respons_data')

exports.getAllProduct = async (req, res, next)=>{
   try {
       let product = await req.itemUC.getProducts(null)
       if(product == null){
           return res
           .status(400)
           .json(res_data.failed, 'Item not found', product)
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
            .json(res_data.failed, 'Product not found', product)
        }

<<<<<<< HEAD
        res.status(200).json(res_data.success(product))
    } catch (error) {
        next(error)
    }
}
=======
  exports.getOneProduct=async (req, res) =>{
        const id = req.params.id
        item.getProductByID(id).then(result =>{
            if(!result){
                res.json('data tidak ada')
            } else {
                res.json(res)
                console.log(res)
            }
        })
        .catch(err=>{
            console.log(err)
        })
   
   
    }


>>>>>>> 62fda099354fd67587e42371c7eb5a9cfe236c30

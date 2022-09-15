const res_data = require('../helper/respons_data')


module.exports = {


getAllCategory : async (req, res, next)=>{
   try {
       let category = await req.categoryUC.getCategory()
       if(category.length === 0){
           return res
           .status(400)
           .json(res_data.failed('Category not found', category))
        } else
        res.json(res_data.success(category))
        
        
    } catch (error) {
            next(error)    
   }   
},

getOneCategory : async (req, res, next)=>{
    try {
        let id = req.params.id
        let category = await req.categoryUC.getCategoryByID(id)
        if(category ==null){
            return res
            .status(400)
            .json(res_data.failed('category not found', category))
        }

        res.status(200).json(res_data.success(category))
    } catch (error) {
        next(error)
    }
},
getProductByCategory : async (req, res, next)=>{
    try {
        let id = req.params.id
        let category = await req.categoryUC.getProductByCategoryID(id)
        if(category == null){
            return res
            .status(400)
            .json(res_data.failed('product not Found', category))
        }
        res.status(200).json(res_data.success(category))

    } catch (error) {
        next(error)
    }
}
}
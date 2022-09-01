const itemRepository = require('../repository/item');
const Item = require('../usecase/item');

item = new Item(new itemRepository())


    let getOneProduct=async (req, res, next) =>{
        const id = req.params.id
        item.getProductByID(id).then(result =>{
            if(!result){
                res.json('data tidak ada')
            } else {
                res.json(res)
            }
        })
        .catch(err = next(err))
   
   
    }



module.exports =getOneProduct
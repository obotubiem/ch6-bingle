const itemRepository = require('../repository/item');
const Item = require('../usecase/item');

item = new Item(new itemRepository())


  exports.getOneProduct=async (req, res) =>{
        const id = req.params.id
        item.getProductByID(id).then(result =>{
            if(!result){
                res.json('data tidak ada')
            } else {
                res.json(res)
            }
        })
        .catch(err=>{
            console.log(err)
        })
   
   
    }



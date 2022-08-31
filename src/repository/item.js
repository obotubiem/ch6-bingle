const ItemInterface = require("./item_interface")
const itemModel = require("../models/product")


class Item extends ItemInterface {
    constructor (){
        super()
        this.itemModel = itemModel
      }

      async getProductByID(id){
        return await this.itemModel.findOne({
            where : {id:id}
        })
      }

      async getProducts(filters){
        if(filters!= null) {
            return await this.itemModel.findAll({
                where : filters
            })
        }
        return await this.itemModel.findAll()
      }

}
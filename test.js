const ItemInterface = require("./src/repository/item_interface")
const ItemUc =require("./usecase/item")


class ItemRepo extends ItemInterface {
    async getProductById(id){
        return{
            id : 1,
            name: "item 1"
        }
    }
    async getProducts(filters){

    }
}
let uc = new ItemUc(new ItemRepo())

uc.getProductById(1).then(res =>{
    console.log(res)
})
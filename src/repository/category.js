const { Category, Product } = require("../database/models")

class CategoryRepository {
    constructor(){
        this.CategoryModel = Category
        this.ProductModel = Product
    }
    async getCategoryByID(id) {
        return await this.CategoryModel.findOne({
          where: {
            id,
          },
        });
      }
    async getProductByCategoryID(id){
     return await this.CategoryModel.findOne({
                where:{id:id},
                include:[
                    {
                    model :this.ProductModel,
                    attributes : ['id', 'name', 'price', 'stock']
                }
                ]
            })
       
    }
    async getCategory(){
     return await this.CategoryModel.findAll()
  }
    async createCategory(category){
     return await this.CategoryModel.create(category)
     
    }
    async updateCategory(category, id){
        return await this.CategoryModel.update(category, {
               where : {id :id}
            })
    }
    async deleteCategory(id){
            return await this.CategoryModel.destroy({
                where : {id :id}
             })
    }

}

module.exports = CategoryRepository
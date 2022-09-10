const { Category } = require("../database/models")

class CategoryRepository {
    constructor(){
        this.CategoryModel = Category
    }
    async getCategoryByID(id){
        let data = null
        try {
            data = await this.CategoryModel.findOne({
                where:{
                    id:id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }
    async getCategory(){
        let data = null
        try {
            data = await this.CategoryModel.findAll()
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }
    async createCategory(category){
        let is_success = false
        try {
            category = await this.CategoryModel.create(category)
            is_success = true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success : is_success,
            category : category
        }
    }
    async updateCategory(category, id){
        let is_success = false
        try {
            category = await this.CategoryModel.update(category, {
               where : {id :id}
            })
            is_success =true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success : is_success,
            category : category
        }
    }
    async deleteCategory(id){
        let is_success = false
        let category = null
        try {
            category = await this.CategoryModel.destroy({
                where : {id :id}
             })
            is_success = true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success :is_success,
            category : category
        }
    }

}

module.exports = CategoryRepository
const { Category } = require("../database/models")

class CategoryRepository {
    constructor() {
        this.categoryModel = Category
    }

    async getcategoryByID(id) {
        let data = null
        try {
            data = await this.categoryModel.findOne({
                where: {
                    id: id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }

    async getcategorys() {
        
        let data = null
        try {
            data = await this.categoryModel.findAll()
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }

    async createCategory(category) {
        let is_success = false
        try {
            category = await this.categoryModel.create(category)
            is_success = true
        } catch (e) {
            console.log(e)
            is_success = false
        }
        return {
            is_success: is_success,
            category: category
        }
    }
    async updateCategory(category, id) {
        let is_success = false
        try {
            category = await this.categoryModel.update(category, {
                where: { id: id }
            })
            is_success = true
        } catch (e) {
            console.log(e)
            is_success = false
        }
        return {
            is_success: is_success,
            category: category
        }
    }
    async deleteCategory(id, category) {
        let is_success = false

        try {
            category = await this.categoryModel.destroy({
                where: { id: id }
            })
            is_success = true
        } catch (e) {
            console.log(e)
        }
        return {
            is_success: is_success,
            category: category

        }
    }
}

module.exports = CategoryRepository
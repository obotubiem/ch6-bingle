const { Product } = require("../database/models")

class ProductRepository {
    constructor() {
        this.ProductModel = Product
    }

    async getProductByID(id) {
        let data = null
        try {
            data = await this.ProductModel.findOne({
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

    async getProducts() {
        
        let data = null
        try {
            data = await this.ProductModel.findAll()
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }

    async createProduct(product) {
        let is_success = false
        try {
            product = await this.ProductModel.create(product)
            is_success = true
        } catch (e) {
            console.log(e)
            is_success = false
        }
        return {
            is_success: is_success,
            product: product
        }
    }
    async updateProduct(product, id) {
        let is_success = false
        try {
            product = await this.ProductModel.update(product, {
                where: { id: id }
            })
            is_success = true
        } catch (e) {
            console.log(e)
            is_success = false
        }
        return {
            is_success: is_success,
            product: product
        }
    }
    async deleteProduct(id) {
        let is_success = false
        let product = null

        try {
            product = await this.ProductModel.destroy({
                where: { id: id }
            })
            is_success = true
        } catch (e) {
            console.log(e)
        }
        return {
            is_success: is_success,
            product: product

        }
    }
}

module.exports = ProductRepository
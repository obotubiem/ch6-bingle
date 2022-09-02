const {Product} = require("../transport/postgresql/models")

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

    async getProducts(filters) {
        if (filters != null) {
            return await this.ProductModel.findAll({
                where: filters
            })
        }

        return await this.ProductModel.findAll()
    }
}

module.exports = ProductRepository
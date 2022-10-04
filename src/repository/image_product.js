const { ImageProduct } = require('../database/models')

class productImageRepository {
    constructor() {
        this.productImageRepository = ImageProduct
    }
    async getAllImageByProductID(product_id) {
        return await this.productImageRepository.findAll({
            where: { product_id: product_id }
        })
    }
    async getImageProductByID(id) {
        return await this.productImageRepository.findOne({
            where: { id: id }
        })
    }
    async createImageProduct(data) {
        return await this.productImageRepository.create(data)
    }
    async updateImageProduct(data, id) {
        return await this.productImageRepository.update(data, {
            where: { id: id }
        })
    }
    async deleteImageProduct(id) {
        return await this.productImageRepository.destroy({
            where: { id: id }
        })
    }
}


module.exports = productImageRepository
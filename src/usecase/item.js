class Item {
    constructor(itemRepository) {
        this.itemRepository = itemRepository
    }

    async getProductByID(id) {
        return await this.itemRepository.getProductByID(id)
    }

    async getProducts(filters) {
        return await this.itemRepository.getProducts(filters)
    }
    async createProduct(product) {
        return await this.itemRepository.createProduct(product)
    }
    async updateProduct(product, id) {
        return await this.itemRepository.updateProduct(product, id)
    }
    async deleteProduct(id){
        return await this.itemRepository.deleteProduct(id)
    }
}

module.exports = Item;
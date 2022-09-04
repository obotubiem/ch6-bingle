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
    async updateProduct(product) {
        return await this.itemRepository.updateProduct(product)
    }
}

module.exports = Item;
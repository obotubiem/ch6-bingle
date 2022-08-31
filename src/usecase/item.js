class Item {
    constructor(itemRepository){
        this.itemRepository = itemRepository
    }
    async getProductByID (id){
        return await this.itemRepository.getProductByID(id)
    }
}

module.exports =Item
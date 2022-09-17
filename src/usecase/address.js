class Address {
    constructor(addressRepositroy){
        this.addressRepositroy = addressRepositroy
    }
    async getAllAddress (){
        return await this.addressRepositroy.getAllAddress()
    }
    async getAddressByID(id){
        return await this.addressRepository.getAddressByID(id)
     }
     async getAddress(filters){
        return await this.addressRepository.getAddress(filters)
    }
      async createAddress(address){
        return await this.addressRepository.createAddress(address)
      }
      async updateAddress(address, id){
        return await this.addressRepository.updateAddress(address, id)
      }
      async deleteAddress(id){
        return await this.addressRepository.deleteAddress(id)
    }
}
module.exports = Address
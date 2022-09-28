class Address {
  constructor(addressRepositroy, userRepository) {
    this.addressRepository = addressRepositroy
    this.userRepository = userRepository
  }
  async getAllAddress() {
    let is_success = false
    let address = null
    address = await this.addressRepository.getAllAddress()
    if (address == null) {
      return {
        message: 'address not added'
      }
    }
    is_success = true
    return {
      is_success,
      address
    }
  }
  async getAddressByUserID(user_id) {
    let is_success = false
   
    let address = await this.addressRepository.getAddressByUserID(user_id)
    if (address = null) {
      return {
        message: "address not found"
      }
    }
    is_success = true
    return {
      address: address,
      is_success: is_success
    }
  }
  async getAddress(filters) {
    return await this.addressRepository.getAddress(filters)
  }

  async addNewAddress(data_address) {
    let is_success = false;
    let address = null;

    let checkExistUser = await this.userRepository.getUserByID(data_address.user_id);
    if (checkExistUser == null) {
      return {
        message: "failed add address, address not found",
      };
    }
    address = await this.addressRepositroy.createAddress(data_address);
    if (address == null) {
      return {
        message: "something went wrong",
      };
    }
    is_success = true;
    return {
      is_success: is_success,
      address: address,
    };
  }
  async updateAddress(address, id) {
    return await this.addressRepository.updateAddress(address, id)
  }
  async deleteAddress(id) {
    return await this.addressRepository.deleteAddress(id)
  }
}
module.exports = Address
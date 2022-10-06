class Address {
  constructor(addressRepositroy, userRepository) {
    this.addressRepository = addressRepositroy
    this.userRepository = userRepository
  }
  async getAddressByUserID(user_id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let address = await this.addressRepository.getAddressByUserID(user_id)
    if (address == null) {
      result.reason = "address not found"
      result.is_success = false
      return
    }
    result.is_success = true
    result.status = 200
    result.data = address
    return result

  }

  async addNewAddress(data_address) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let existUser = await this.userRepository.getUserByID(data_address.user_id);
    if (existUser == null) {
      result.reason = "failed add address, address not found"
      return result
    }
    let address = await this.addressRepository.createAddress(data_address);
    if (address == null) {
      result.reason = "something went wrong"
      return result
    }
    result.is_success = true;
    result.status = 200
    result.data = address
    return result
  }
  async updateAddress(address_data, id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let existUser = await this.userRepository.getUserByID(address_data.user_id);
    if (existUser == null) {
      result.reason = "failed add address, address not found"
      return result
    }
    let existAddress = await this.addressRepository.getAddressByID(id);
    if (existAddress === null) {
      result.reason = "failed add address, address not found"
      return result
    }
    let address = await this.addressRepository.updateAddress(address_data, id)
    if (address == null) {
      result.reason = "internal server error"
      result.status = 500
      return result
    }
    result.is_success = true;
    result.status = 200
    result.data = address
    return result

  }
  async deleteAddress(id) {
    let result = {
      is_success: false,
      reason: "failed",
      status: 404,
      data: null
    }
    let existAddress = await this.addressRepository.getAddressByID(id);
    if (existAddress == null) {
      result.reason = "failed delete address, address not found"
      return result
    }
    let address = await this.addressRepository.deleteAddress(id)
    if (address == null) {
      result.reason = "internal server error"
      result.status = 500
      return result
    }
    result.is_success = true;
    result.status = 200
    result.data = address
    return result
  }

}
module.exports = Address
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
  async getAddressByUser(id) {
    let is_success = false
    let address = await this.userRepository.getAddressByUserID(id)
    console.log(address)
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
    let checkExistUser = await this.userRepository.getUserByID(data_address.user_id);
    if (checkExistUser == null) {
      return {
        message: "failed add address, address not found",
      };
    }
    let address = await this.addressRepository.createAddress(data_address);
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
  async updateAddress(address_data, id) {
    let is_success = false
    let address =null
    let checkExistUser = await this.userRepository.getUserByID(data_address.user_id);
    if (checkExistUser == null) {
      return {
        message: "failed add address, address not found",
      };
    }
    let checkExistAddress = await this.addressRepository.getAddressByID(id);
    if (checkExistAddress == null) {
      return {
        message: "failed add address, address not found",
      };
    }
    
   address = await this.addressRepository.updateAddress(address_data, id)
    is_success =true
    return {
      is_success : is_success,
      address : address
    }
  }


  async deleteAddress(id) {
    let is_success = false
    let address = null
    let checkExistAddress = await this.addressRepository.getAddressByID(id);
    if (checkExistAddress == null) {
      return {
        message: "failed add address, address not found",
      };
    }
    address = await this.addressRepository.deleteAddress(id)
    is_success = true
    return {
      is_success : is_success,
      address : address
    }
  }
 
}
module.exports = Address
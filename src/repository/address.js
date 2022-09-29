const { Address, User } = require("../database/models");

class AddressRepository {
  constructor() {
    this.AddressModel = Address;
    this.UserModel = User;
  }
  async getAllAddress() {
   return await this.AddressModel.findAll({
      include: [
        {
          model: this.UserModel,
        },
      ],
    });
  }
  async getAddressByUserID(user_id) {
    return await this.AddressModel.findAll({
      where: { user_id: user_id },
    });
  } 
   async getAddressByID(id) {
    return await this.AddressModel.findOne({
      where: { id:id },
    });
  }
  async createAddress(address) {
    return await this.AddressModel.create(address);
  }
  async updateAddress(address, id) {
  return await this.AddresModel.update(address, {
      where: { id: id },
    });
  }
  async deleteAddress(id) {
  return await this.AddressModel.destroy({
      where: { id: id },
    });
  }
}

module.exports = AddressRepository;

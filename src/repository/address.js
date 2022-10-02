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
          attributes: { exclude: ["password", "role_id", "avatar"] }
        },
      ],
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

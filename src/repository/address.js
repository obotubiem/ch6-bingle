const { Address, User } = require("../database/models");

class AddressRepository {
  constructor() {
    this.AddressModel = Address;
    this.UserModel = User;
  }
  async getAllAddress() {
    let data = await this.AddressModel.findAll({
      include: [
        {
          model: this.UserModel,
        },
      ],
    });
    return data;
  }
  async getAddressByID(id) {
    data = await this.AddressModel.findOne({
      where: { id: id },
    });
    return data;
  }
  async createAddress(address) {
    let data = await this.AddressModel.create(address);

    return data;
  }
  async updateAddress(address, id) {
    let data = await this.AddresModel.update(address, {
      where: { id: id },
    });
    return data;
  }
  async deleteAddress(id) {
    data = await this.AddressModel.destroy({
      where: { id: id },
    });
    return address;
  }
}

module.exports = AddressRepository;

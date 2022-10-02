const { User } = require("../database/models");
const { Address } = require("../database/models");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor() {
    this.UserModel = User;
    this.AddressModel = Address;
  }
  async getAllUser() {
    return await this.UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: this.AddressModel,
        },
      ],
    });
  }
  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username: username },
    });
  }

  async getUserByEmail(email) {
    return await this.UserModel.findOne({
      where: { email: email },
    });
  }

  async getUserByPhone(phone) {
    return await this.UserModel.findOne({
      where: { phone: phone },
    });
  }

  async getUserByID(id) {
    return await this.UserModel.findOne({
      where: { id: id },
    });
  }

  async updateUser(user, id) {
    return await this.UserModel.update(user, {
      where: { id: id },
    });
  }

  async registerUser(user_data) {
    user_data.password = bcrypt.hashSync(user_data.password, 10);
    user_data.is_admin = false;
    return await this.UserModel.create(user_data);
  }

  async loginUser(username, password) {
    let user = null;
    user = await this.getUserByUsername(username);
    if (user === null) {
      return user;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return null;
    }
    return user;
  }
}

module.exports = UserRepository;

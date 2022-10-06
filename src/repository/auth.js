const { User } = require("../database/models");
const bcrypt = require("bcrypt");

class AuthRepository {
  constructor() {
    this.UserModel = User;
  }

  async getUserByUsername(username) {
    return await this.UserModel.findOne({
      where: { username: username },
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

module.exports = AuthRepository;
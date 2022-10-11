class User {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    let is_success = true
    let message = "Success"
    let status = 200

    let user = await this.userRepository.getAllUser()

    if (user == null) {
      status = 404
      message = "User empty"
      is_success = false
    }

    return {
      is_success,
      message,
      user,
      status
    }
  }

  async getUserByID(id) {
    let is_success = true
    let message = "Success"
    let status = 200

    let user = await this.userRepository.getUserByID(id);
    if (user == null) {
      message = "User not found"
      is_success = false
      status = 404
    }

    return {
      is_success,
      message,
      user,
      status
    }
  }

  async updateUser(user_data, id) {
    let is_success = false
    let user = null
    user = await this.userRepository.getUserByUsername(user_data.username);
    if (user != null) {
      return { message: "username already exist" };
    }
    user = await this.userRepository.getUserByEmail(user_data.email);
    if (user != null) {
      return { message: "email already exist" };
    }
    user = await this.userRepository.getUserByPhone(user_data.phone);
    if (user != null) {
      return { message: "phone already exist" };
    }
    user = await this.userRepository.updateUser(user_data, id);
    if (user == null) {
      return { message: "internal server error" }
    }
    is_success = true
    return {
      is_success: is_success,
      user: user
    }
  }

  async register(user_data) {
    let is_success = false;
    let user = null;
    user = await this.userRepository.getUserByUsername(user_data.username);
    if (user != null) {
      return { message: "username already exist" };
    }
    user = await this.userRepository.getUserByEmail(user_data.email);
    if (user != null) {
      return { message: "email already exist" };
    }
    user = await this.userRepository.getUserByPhone(user_data.phone);
    if (user != null) {
      return { message: "phone already exist" };
    }
    user = await this.userRepository.registerUser(user_data);
    if (user == null) {
      return { message: "somthing went wrong" };
    }
    is_success = true;
    return {
      is_success: is_success,
      user: user,
    };
  }

  async login(username, password) {
    let is_success = false
    let user = await this.userRepository.loginUser(username, password)
    if (user == null) {
      return { message: "incorect username or password" };
    }
    is_success = true
    return {
      is_success: is_success,
      user: user,
    }
  }
}

module.exports = User;

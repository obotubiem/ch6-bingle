class User {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async getAllUser() {
    return await this.userRepository.getAllUser();
  }

  async getUserByID(id) {
    return await this.userRepository.getUserByID(id);
  }
  async updateUser(user, id) {
    return await this.userRepository.getUserByID(user, id);
  }

  async createUser(user) {
    return await this.userRepository.createUser(user);
  }

  async register(user_data) {
    let is_success = false;
    let user = null;
    user = await this.userRepository.getUserByUsername(user_data.username);
    if (user != null) {
      return {message: "username already exist"};
    }
    user = await this.userRepository.getUserByEmail(user_data.email);
    if (user != null) {
      return {message: "email already exist"};
    }
    user = await this.userRepository.getUserByPhone(user_data.phone);
    if (user != null) {
      return {message: "phone already exist"};
    }
    user = await this.userRepository.registerUser(user_data);
    if (user == null) {
      return {message: "somthing went wrong"};
    }
    is_success = true;
    return {
      is_success: is_success,
      user: user,
    };
  }
   async login (username, password){ 
        let is_success = false
        let user = null
        user = await this.userRepository.loginUser(username, password)
        if(user == null){
            return {message: "incorect username or password",};
        }
        is_success = true
        return{
            is_success : is_success,
            user : user,
        }
   }
}

module.exports = User;

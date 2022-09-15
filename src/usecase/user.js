class User {
    constructor (userRepository){
        this.userRepository = userRepository
    }
    async getUserByUsername(username) {
        return await this.userRepository.getUserByUsername(username)
    }
    async getUserByEmail(email) {
        return await this.userRepository.getUserByEmail(email)
    }
    async getUserByPhone(phone) {
        return await this.userRepository.getUserByPhone(phone)
    }

    async getUserByID(id) {
        return await this.userRepository.getUserByID(id)
    }

    async createUser(user){
        return await this.userRepository.createUser(user)
    }
}

module.exports= User
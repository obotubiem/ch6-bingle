const{User} = require('../transport/postgresql/models')

class UserRepository {
    constructor (){
        this.UserModel = User
    }
    async getUserByUsername (username) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {username: username} 
                  
            })
        } catch (error) {
            console.log(error)
        }
        return user
    }

    async getUserByID  (id){
        let user =null
        try {
            user = await this.UserModel.findOne(id)
        } catch (error) {
            console.log(error)
        }
        return user
    }

    async createUser(user) {
        let is_success = false
        try {
            user = await this.UserModel.create(user)
            is_success = true
        } catch (error) {
            console.log(error)
        }
        return {
            is_success : is_success,
            user : user
        }
    }
}

module.exports = UserRepository
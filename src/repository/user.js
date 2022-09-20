const{User} = require("../database/models")
const {Address} = require('../database/models')

class UserRepository {
    constructor (){
        this.UserModel = User
        this.AddressModel = Address
    }
    async getAllUser (){
        let user =null
        try {
            user = await this.UserModel.findAll({
                attributes : {exclude: ['password']},
                include:[
                    {
                    model :this.AddressModel
                }],
               
            })
        } catch (error) {
            console.log(error)
        }
        return user 
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

    async getUserByEmail (email) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {email: email} 
                  
            })
        } catch (error) {
            console.log(error)
        }
        return user
    }
    async getUserByPhone (phone) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where : {phone: phone} 
                  
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
    async updateUser(user, id) {
        let is_success = false
        try {
            user = await this.UserModel.update(user, {
                where :{id:id}
            })
            is_success = true
        } catch (error) {
            console(error)
        }
        return {
            is_success : is_success,
            user : user
        }
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
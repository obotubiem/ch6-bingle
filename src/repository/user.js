const { User } = require("../database/models")
const { Address } = require('../database/models')
const bcrypt = require("bcrypt")

class UserRepository {
    constructor() {
        this.UserModel = User
        this.AddressModel = Address
    }
    async getAllUser() {
        let user = null
        try {
            user = await this.UserModel.findAll({
                attributes: { exclude: ['password'] },
                include: [
                    {
                        model: this.AddressModel
                    }],

            })
        } catch (error) {
            console.log(error)
        }
        return user
    }

    async getUserByUsername(username) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where: { username: username }

            })
        } catch (error) {
            console.log(error)
        }
        return user
    }

    async getUserByEmail(email) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where: { email: email }

            })
        } catch (error) {
            console.log(error)
        }
        return user
    }
    async getUserByPhone(phone) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where: { phone: phone }

            })
        } catch (error) {
            console.log(error)
        }
        return user
    }


    async getUserByID(id) {
        let user = null
        try {
            user = await this.UserModel.findOne({
                where: { id: id }
            })
        } catch (error) {
            console.log(error)
        }
        return user
    }
    async updateUser(user, id) {
        let is_success = false
        try {
            user = await this.UserModel.update(user, {
                where: { id: id }
            })
            is_success = true
        } catch (error) {
            console(error)
        }
        return {
            is_success: is_success,
            user: user
        }
    }

    async registerUser(user_data) {
        user_data.password = bcrypt.hashSync(user_data.password, 10)
        user_data.is_admin = false

        let user = null
        try {
            user = await this.UserModel.create(user_data)
        } catch (e) {
            console.error(e)
            return null
        }

        return user
    }

    async loginUser(username, password) {
        let user = null
        try {
            user = await this.getUserByUsername(username)
            if (user === null) {
                return user
            }
        } catch (e) {
            console.log(e)
            return null
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return null
        }
        return user
    }
}

module.exports = UserRepository
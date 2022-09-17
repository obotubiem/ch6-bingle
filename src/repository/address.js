const {Address} = require('../database/models')
const {User} = require('../database/models')

class AddressRepository{
    constructor(){
        this.AddressModel = Address
        this.UserModel = User
    }
    async getAllAddress(){
        let data = null
        try {
            data = await this.AddressModel.findAll({
                include:[
                    {
                    model :this.UserModel
                }]
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }
    async getAddressByID(id){
        let data = null
        try {
            data = await this.AddressModel.findOne({
                where:{
                    id:id
                }
            })
        } catch (err) {
            console.log(err)
            return null
        }
        return data
    }
    async createAddress(address){
        let is_success = false
        try {
            category = await this.AddressModel.create(address)
            is_success = true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success : is_success,
            address : address
        }
    }
    async updateCategory(address, id){
        let is_success = false
        try {
            address = await this.AddresModel.update(address, {
               where : {id :id}
            })
            is_success =true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success : is_success,
            address : address
        }
    }
    async deleteAddress(id){
        let is_success = false
        let address = null
        try {
            address = await this.AddressModel.destroy({
                where : {id :id}
             })
            is_success = true
        } catch (err) {
            console.log(err)
        }
        return {
            is_success :is_success,
            address : address
        }
    }
}




module.exports = AddressRepository
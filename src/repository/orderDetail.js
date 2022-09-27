const {OrderDetail} = require('../database/models')

class OrderRepository {
    constructor(){
        this.OrderDetailRepository = OrderDetail
    }

    async getOrderDetails(order_id){
        let details = []
        details = this.OrderDetailRepository.findAll({
            where : {
                order_id : order_id
            }
        })
        return details
    }
    async createOrderDetails (detail){
        return await this.OrderDetailRepository.create(detail)
    }
}

module.exports = OrderRepository
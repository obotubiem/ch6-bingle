const { Order} = require("../database/models");
const order_constants = require("../internal/constants/order");
class OrderRepository {
  constructor() {
    this.OrderModel = Order;
  }
  async getPendingOrderByUserID(user_id) {
    return await this.OrderModel.findOne({
      where: {
        user_id: user_id,
        status: order_constants.ORDER_PENDING,
      },
    });
  }

  async createOrder(orders) {
    return await this.OrderModel.create(orders);
     }

}

module.exports = OrderRepository;

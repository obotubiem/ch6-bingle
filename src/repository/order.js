const { Order, User, OrderDetail} = require("../database/models");
const order_constants = require("../internal/constants/order");
class OrderRepository {
  constructor() {
    this.OrderModel = Order;
    this.UserModel = User;
    this.OrderDetail = OrderDetail
  }
  async getPendingOrderByUserID(user_id) {
    let order = null
    order = await this.OrderModel.findOne({
      where: {
        user_id: user_id,
        status: order_constants.ORDER_PENDING,
      }, include: [
        {
          model: this.UserModel,
          attributes: ['id', 'username']
        },
        {
          model : this.OrderDetail
        }
      ]
    });
    return order
  
  }

  async createOrder(orders) {
   let order = null
   order =  await this.OrderModel.create(orders);
   console.log(order)
   return order
     }

}

module.exports = OrderRepository;

const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }
  async getOrder(user_id) {
    let order = null;
    order = await this.orderRepository.getPendingOrderByUserID(user_id);

    if (order == null) {
      return {
        order: order,
        message: "customer has not ordered",
      };
    }
    return {
      ...order.dataValues,
      details: await this.orderDetailRepository.getOrderDetails(order.id),
    };
  }
  async createOrderUser(user_id, items) {
    let is_success = false;
    let order_data = {
      user_id: user_id,
      status: order_constants.ORDER_PENDING,
    };
    let order = null;
    order = await this.orderRepository.createOrder(order_data);
    if(order === null){
      return { message : 'something went error' }
    }
    is_success = true;
   
    order = await this.orderRepository.getPendingOrderByUserID(user_id);
    await this.addOrderDetails(order.id, items);
    return {
      is_success: is_success,
      order: order,
    };
  }
  async addOrderDetails(order_id, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].qty < 0) {
        continue;
      }
      let item = null;
      item = await this.productRepository.getItemByID(item[i].id);
      console.log(item)
      if (item != null) {
        let detail = {
          order_id: order_id,
          product_id: item.id,
          qty: item[i].id,
        };
         await this.orderDetailRepository.createOrderDetails(detail);
      }
    }
  }
}

module.exports = Order;

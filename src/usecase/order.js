const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async getOrder(user_id) {

    return await this.orderRepository.getPendingOrderByUserID(user_id)
  }

  async createOrderUser(user_id, items) {
    let is_success = false;
    let order_data = {
      user_id: user_id,
      status: order_constants.ORDER_PENDING,
    };
    let order = null;
    order = await this.orderRepository.createOrder(order_data);
    if (order === null) {
      return { message: 'something went error' }
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

    for (let item of items) {
      if (item.qty < 0) {
        continue;
      }

      const product = await this.productRepository.getProductByID(item.id);

      let qty = item.qty
      let price = product.price
      let total = price * qty

      if (product != null) {
        let detail = {
          order_id,
          product_id: product.id,
          qty,
          price,
          total
        }

        const existDetail = await this.orderDetailRepository.getByOrderAndProduct(order_id, product.id)

        if (existDetail !== null) {
          await existDetail.set({
            qty, price, total
          })
        } else {
          await this.orderDetailRepository.createOrderDetails(detail);
        }
      }
    }

  }
}

module.exports = Order;

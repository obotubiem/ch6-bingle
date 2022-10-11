const { OrderDetail } = require("../database/models");

class OrderDetailRepository {
  constructor() {
    this.OrderDetailRepository = OrderDetail;
  }

  async getOrderDetails(order_id) {
    return await this.OrderDetailRepository.findAll({
      where: {
        order_id: order_id,
      },
    });
  }

  async createOrderDetails(detail) {
    return await this.OrderDetailRepository.create(detail);
  }

  async getByOrderAndProduct(order_id, product_id) {
    return await this.OrderDetailRepository.findOne({
      where: {
        order_id: order_id,
        product_id: product_id,
      },
    });
  }

  async updateOrderDetail(id, data) {
    const orderDetail = await this.OrderDetailRepository.findByPk(id);
    if (orderDetail === null) {
      return false;
    }

    return await orderDetail.update(data);
  }
}

module.exports = OrderDetailRepository;

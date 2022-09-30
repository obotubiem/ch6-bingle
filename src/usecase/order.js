const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async getOrder(user_id) {
    let order = null
    order = await this.orderRepository.getPendingOrderByUserID(user_id);
    // if(order !=null){
    //   let grandTotal = await this.orderDetailRepository.sum("total",{
    //     where : {
    //       order_id : order.id
    //     }
    //   })
    // }
    order.setDataValue("grandTotal", null);
    return order
  }

  async createOrderUser(user_id, items) {
    let is_success = false;
    let data_order = {
      user_id: user_id,
      status: order_constants.ORDER_PENDING,
    };
    let order = null;
    order = await this.orderRepository.getPendingOrderByUserID(user_id);
    if (order == null) {
      await this.orderRepository.createOrder(data_order);
    }
    await this.orderRepository.updateOrder(data_order, {
      where: { id: order.id },
    });
    for (let i = 0; i < items.length; i++) {
      let product = await this.productRepository.getProductByID(items[i].id);
      if (product != null) {
        let existDetail = await this.orderDetailRepository.getByOrderAndProduct(
          order_id,
          product.id
        );
        if (existDetail != null) {
          await existDetail.set({
            qty,
            price,
            total,
          });
        } else {
          let detailOrderData = items[i];
          (detailOrderData.product_id = product.id),
            (detailOrderData.price = product.price),
            (detailOrderData.order_id = order.id);

          delete detailOrderData.id;

          await this.orderDetailRepository.createOrderDetails(detail);
          is_success = true;
          return {
            is_success,
            order,
          };
        }
      }
    }
  }

  async addOrderDetails(order_id, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].qty <= 0) {
        continue;
      }
      let product = null;
      product = await this.productRepository.getProductByID(items[i].id);
      if (product != null) {
        let qty = items[i].qty;
        let price = product.price;
        let total = price * qty;

        if (product != null) {
          let detail = {
            order_id,
            product_id: product.id,
            qty,
            price,
            total,
          };
          await this.orderDetailRepository.createOrderDetails(detail);
        }
      }
    }
  }
}
module.exports = Order;

const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async getOrder(user_id) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let order = await this.orderRepository.getPendingOrderByUserID(user_id);
    if (order === null) {
      result.reason = "customer has not ordered"
      return result
    }
    result.is_success = true
    result.data = order
    return result

  }

  async createOrderUser(user_id, items) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let order = {
      user_id: user_id,
      status: order_constants.ORDER_PENDING
    }
    let res_order= null
    res_order = await this.orderRepository.createOrder(order)
    order = await this.orderRepository.getPendingOrderByUserID(user_id)

    await this.addOrderDetails(order.id, items)

    result.is_success = true
    result.status = 200
    result.data = order
    return result
  }


  //   let createOrder = async (user_id, items) => {
  //     let is_success = false
  //     let order = {
  //         user_id: user_id,
  //         status: order_constants.ORDER_PENDING
  //     }
  //     let res_order = null
  //     try {
  //         res_order = await Order.create(order)
  //         is_success = true
  //     } catch (e) {
  //         console.log(e)
  //     }
  //     order = await getPendingOrderByUserID(user_id)
  //     await addOrderDetails(order.id, items)
  //     return {
  //         is_success: is_success,
  //         order: order
  //     }
  // }

  // let addOrderDetails =  async (order_id, items) => {
  //     for (let i = 0; i < items.length; i++) {
  //         if (items[i].qty <= 0) {
  //             continue
  //         }
  //         let menu = null
  //         menu = await menu_uc.getMenuByID(items[i].id)
  //         if (menu !== null) {
  //             let detail = {
  //                 order_id: order_id,
  //                 menu_id: menu.id,
  //                 qty: items[i].qty
  //             }
  //             try{
  //                 await OrderDetail.create(detail)
  //             } catch (e) {
  //                 console.log(e)
  //             }
  //         }
  //     }
  // }

  async addOrderDetails(order_id, items) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].qty <= 0) {
        continue;
      }
      let product = null;
      product = await this.productRepository.getProductByID(items[i].id);
      if (product != null) {
        // let qty = items[i].qty;
        // let price = product.price;
        // let total = price * qty;
        let detail = {
          order_id : order_id,
          product_id: product.id,
          qty : items[i].qty
          // price,
          // total,
        };

        await this.orderDetailRepository.createOrderDetails(detail);

      }
    }
  }
  // async validateStock(items) {
  //   let is_success = true
  //   let message = ''
  //   for (let i = 0; i < items.length; i++) {
  //     let product = await this.productRepository.getProductByID(items[i].id)
  //     let qty = items[i].qty
  //     let stock = product.stock

  //     if (qty > stock) {
  //       is_success = false
  //       return { message: `stock ${product.name} kurang dari ${qty}` }
  //     }
  //   }
  //   return {
  //     is_success,
  //     message 
  //   }
  // }

}
module.exports = Order;

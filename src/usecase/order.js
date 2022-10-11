const order_constants = require("../internal/constants/order");
class Order {
  constructor(orderRepository, orderDetailRepository, productRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
  }

  async getPendingOrderByUserID(user_id) {
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let order = null
    order = await this.orderRepository.getPendingOrderByUserID(user_id)
    if (order === null) {
      result.result = "customer has not ordered"
      return result
    }
    result.is_success = true
    result.status = 200
    result.data = order
    return result
  }

  async createOrder (user_id, items){
    let result = {
      is_success: false,
      reason: '',
      status: 404,
      data: null
    }
    let order_data = {
      user_id: user_id,
      status : order_constants.ORDER_PENDING
    }
    let order = null
   order = await this.orderRepository.getPendingOrderByUserID(user_id)
    if(order === null){
      
      order = await this.orderRepository.createOrder(order_data)
     
    }
     await this.addOrderDetails(order.id, items)
    result.is_success =true
    result.data = order
    result.status = 200
    return result
  }

  async addOrderDetails (order_id, items){
    for(let i=0 ;i< items.length; i++){
      if(items[i].qty <= 0){
        continue
      }
      let product = null
      product = await this.productRepository.getProductByID(items[i].id)
      if(product !== null){
        let detail = {
          order_id:order_id,
          product_id : product.id,
          qty: items[i].qty
        }
        await this.orderDetailRepository.createOrderDetails(detail)
      }
    }
  }


  // async getOrder(user_id) {
  //   let result = {
  //     is_success: false,
  //     reason: '',
  //     status: 404,
  //     data: null
  //   }
  //   let order = await this.orderRepository.getPendingOrderByUserID(user_id);
  //   if (order === null) {
  //     result.reason = "customer has not ordered"
  //     return result
  //   }
  //   result.is_success = true
  //   result.data = order
  //   return result

  // }

  // async createOrderUser(user_id, items) {
  //   let result = {
  //     is_success: false,
  //     reason: '',
  //     status: 404,
  //     data: null
  //   }
  //   let order_data = {
  //     user_id: user_id,
  //     status: order_constants.ORDER_PENDING
  //   }

  //  let order = await this.orderRepository.getPendingOrderByUserID(user_id)
  //   if(order === null){

  //     await this.orderRepository.createOrder(order_data)
  //   } else {
  //     order = await this.orderRepository.getPendingOrderByUserID(user_id)
  //     await this.addOrderDetails(order.id, items)

  //   }


  //   result.is_success = true
  //   result.status = 200
  //   result.data = order
  //   return result
  // }

  // async addOrderDetails(order_id, items) {
  //   for (let i = 0; i < items.length; i++) {
  //     if (items[i].qty <= 0) {
  //       continue;
  //     }
  //     let product = null;
  //     product = await this.productRepository.getProductByID(items[i].id);
  //     if (product != null) {
  //       let qty = items[i].qty;
  //       let price = product.price;
  //       let total = price * qty;
  //       let detail = {
  //         order_id: order_id,
  //         product_id: product.id,
  //         qty: items[i].qty,
  //         price,
  //         total,
  //       };

  //       await this.orderDetailRepository.createOrderDetails(detail);

  //     }
  //   }
  // }
  // async changeOrderStatus (order_id, status){
  //   let order = await this.orderRepository.getOrderByOrdeID(order_id)
  //   let order_details = await this.orderDetailRepository.getOrderDetails(order_id)

  //   order_details.forEach(async item => {
  //     let product = await this.productRepository.getProductByID(item.product_id)
  //     if(product.stock <=0){
  //       return
  //     }else{
  //       if(order.status !== status){
  //         if(status === order_constants.ORDER_PROCESSED){
  //           await this.updateStock(
  //             item.product_id,
  //             item.qty,
  //             order_constants.ORDER_PROCESSED
  //           )
  //         }
  //         if(status === order_constants.ORDER_CANCELED && order.status === order_constants.ORDER_PROCESSED){
  //           await this.updateStock(
  //             item.product_id,
  //             item.qty,
  //             order_constants.ORDER_CANCELED
  //           )
  //         }
  //       }
  //     }
  //   });
  // }

  // async updateStock  (product_id, qty, status) {
  //   let product = await this.productRepository.getOrderByOrdeID(product_id)
  //   let newStock = 0
  //   if (status === order_constants.ORDER_PROCESSED){
  //     newStock = product.stock - qty
  //   }
  //   if(status === order_constants.ORDER_CANCELED){
  //     newStock = product.stock + qty
  //   }
  //   return await this.productRepository.updateProduct({
  //     stock: newStock, product_id
  //   })
  // }
}
module.exports = Order;

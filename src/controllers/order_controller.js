const res_data = require("../helper/respons_data");
const order_constants = require("../internal/constants/order");
module.exports = {
  getOrder: async (req, res, next) => {
    let user_id = req.user.id;
    try {
      let order = await req.orderUC.getPendingOrderByUserID(user_id);
      if (!order.is_success) {
        return res.status(order.status).json(res_data.failed(order.message));
      }
      res.status(order.status).json(res_data.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req, res, next) => {
    let user_id = req.user.id;
    let items = req.body.items;
    try {
      let create_res = await req.orderUC.createOrder(user_id, items);
      if (!create_res.is_success) {
        return;
      }
      res.status(create_res.status).json(create_res.data);
    } catch (e) {
      next(e);
    }
  },

  changeStatusOrder: async (req, res, next) => {
    let user_id = req.user.id;
    let order_data = await req.orderUC.getOrder(user_id);
    if (!order_data.is_success) {
      return res.status(order_data.status).json(res_data.failed(order_data.message));
    }
    await req.orderUC.changeOrderStatus(order_data.id, order_constants.ORDER_SUBMITTED);
    res.status(200).json(res_data.success());
  },
};

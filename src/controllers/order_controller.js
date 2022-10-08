const res_data = require("../helper/respons_data");
module.exports = {
  getOrder: async (req, res, next) => {
    let user_id = req.user.id;
    try {
      let order = await req.orderUC.getOrder(user_id);
      if (order.is_success !== true) {
        return res
        .status(order.status)
        .json(res_data.failed(order.reason));
      }
      res.status(order.status).json(res_data.success(order.data));
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req, res, next) => {
    let user_id = req.user.id
    let items = req.body.items
    let order = await req.orderUC.getOrder(user_id)

    try {
      if (order.is_success !== true) {
        let create_res = await req.orderUC.createOrderUser(user_id, items);
        if (create_res.is_success !== true) {
        return res
        .status(create_res.status)
        .json(create_res.reason)
        }
      } else {
        await req.orderUC.addOrderDetails(order.id, items)
      }
      order = await req.orderUC.getOrder(user_id)
      res.status(order.status).json(res_data.success(order.data))
    } catch (e) {
      next(e)
    }
  },
}

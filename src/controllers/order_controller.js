const res_data = require("../helper/respons_data");
module.exports = {
  getOrder: async (req, res, next) => {
    let userId = req.user.id;
    try {
      const order = await req.orderUC.getOrder(userId);
      if (order === null) {
        return res.status(404).json(order.message);
      }
      res.status(200).json(res_data.success(order));
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req, res, next) => {
    let userId = req.user.id
    let items = req.body.items
    let order = await req.orderUC.getOrder(userId)

    try {
      if (order === null) {
        let create_res = await req.orderUC.createOrderUser(userId, items);
        if (create_res.is_success !== true) {
          res.status(400).json(create_res.message)
        }
      } else {
        await req.orderUC.addOrderDetails(order.id, items)
      }
      order = await req.orderUC.getOrder(userId)
      res.status(200).json(res_data.success(order))
    } catch (e) {
      next(e)
    }
  },
}

const res_data = require("../helper/respons_data");
module.exports = {
  getOrder: async (req, res, next) => {
    let id = req.params.id;
    try {
      res_order = await req.orderUC.getOrder(id);
      if (res_order == null) {
        return res.status(404).json(res_order.message);
      }
      res.status(200).json(res_data.success(res_order));
    } catch (e) {
      next(e);
    }
  },

  createOrder: async (req, res, next) => {
    let id = req.params.id;
    let items = req.body;
    let order = await req.orderUC.getOrder(id)
    try {
      if (order === null) {
        let create_res = await req.orderUC.createOrderUser(id, items);
        if (create_res.is_success !== true) {
          res.status(400).json(create_res.message)
        }
      } else {
        await req.orderUC.addOrderDetails(order.id, items)
      }
      order = await req.orderUC.getOrder(id)
      res.status(200).json(res_data.success(order));
    } catch (e) {
      next(e);
    }
  },
};

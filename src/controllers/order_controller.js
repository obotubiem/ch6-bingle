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
    try {
      let res_order = await req.orderUC.addOrderDetails(id, items);

      res.status(200).json(res_data.success(res_order));
    } catch (e) {
      next(e);
    }
  },
};

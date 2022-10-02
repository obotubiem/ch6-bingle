const res_data = require("../helper/respons_data");

module.exports = {

  getAddressByUserID: async (req, res, next) => {
    try {
      let user_id = req.params.user_id
      let res_address = await req.addressUC.getAddressByUserID(user_id);
      if (res_address === null) {
        return res
          .status(404)
          .json(res_data.failed(res_address.message, null));
      }
      res.status(200).json(res_data.success(res_address.address));
    } catch (e) {
      next(e);
    }
  },
  addAddress: async (req, res, next) => {
    try {
      let address = {
        province,
        city,
        postal_code,
        detail_address,
        user_id
      } = req.body

      let create_res = await req.addressUC.addNewAddress(address);
      if (create_res.is_success != true) {
        return res
          .status(404)
          .json(res_data.failed(create_res.message));
      }
      res.json(res_data.success(address));
    } catch (e) {
      next(e);
    }
  },

  editAddres: async (req, res, next) => {
    let id = req.params.id;
    try {
      let address = {
        province,
        city,
        postal_code,
        detail_address,
        user_id
      } = req.body

      let res_update = await req.addressUC.updateAddress(address, id);
      if (res_update.is_success != true) {
        return res
          .status(500)
          .json(res_data.failed(res_update.message));
      }
      res.status(200).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  deleteAddress: async (req, res, next) => {
    try {
      let id = req.params.id;
      let delete_res = await req.addressUC.deleteAddress(id);
      if (delete_res.is_success !== true) {
        return res
          .status(400)
          .json(res_data.failed(delete_res.message));
      }
      res.json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};

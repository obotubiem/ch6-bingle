const res_data = require("../helper/respons_data");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      let user = await req.userUC.getAllUser();
      if (user.length === 0) {
        return res.status(404).json(res_data.failed("user not found", null));
      } else res.json(res_data.success(user));
    } catch (e) {
      next(e);
    }
  },
  getOneUser: async (req, res, next) => {
    try {
      let id = req.params.id;
      let user = await req.userUC.getUserByID(id);
      if (user == null) {
        return res.status(400).json(res_data.failed("user not found", null));
      }
      res.status(200).json(res_data.success(user));
    } catch (e) {
      next(e);
    }
  },
  editUser: async (req, res, next) => {
    try {
      let id = req.params.id;
      let user = req.body;

      let res_update = await req.userUC.updateUser(user, id);
      if (res_update.is_success !== true) {
        return res
          .status(500)
          .json(res_data.failed("internal server error", null));
      }
    } catch (e) {
      next(e);
    }
  },
};

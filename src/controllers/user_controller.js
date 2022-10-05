const res_data = require("../helper/respons_data");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      let res_user = await req.userUC.getAllUser();
      if (res_user == null) {
        return res
        .status(404)
        .json(res_data.failed(res_user.reason, res_user.data));
      } 
       res.json(res_data.success(res_user.data));
    } catch (e) {
      next(e);
    }
  },
  getUserByID: async (req, res, next) => {
    try {
      let id = req.params.id;
      let res_user = await req.userUC.getUserByID(id);
      if (res_user == null) {
        return res
        .status(404)
        .json(res_data.failed(res_user.message, null));
      }
      res.status(200).json(res_data.success(res_user.result));
    } catch (e) {
      next(e);
    }
  },
  editUser: async (req, res, next) => {
    try {
      let id = req.user.id
      let user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        phone: req.body.phone,
        email: req.body.email,
      };

      let res_update = await req.userUC.updateUser(user, id);
      if (res_update.is_success !== true) {
        return res
          .status(400)
          .json(res_data.failed(res_update.message, null));
      }
      res.status(200).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};

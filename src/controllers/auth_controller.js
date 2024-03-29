const res_data = require("../helper/respons_data");
const url = require("../libs/handle_Upload");
const generateToken = require("../helper/jwt");
const _ = require("lodash")

module.exports = {
  register: async (req, res, next) => {
    try {
      let user_data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email,
        avatar: null,
        role_id: 2,
      };
      if (req.body.password !== req.body.confrimPassword) {
        return res
          .status(400)
          .json(res_data.failed("password and confrimPassword not", null));
      }
      let avatar = null;
      if (req.file != undefined) {
        avatar = await url.uploadCloudinaryAvatar(req.file.path);
      } else {
        avatar = process.env.PROFILE_URL;
      }
      user_data.avatar = avatar;

      let res_user = await req.authUC.register(user_data);
      if (res_user.is_success != true) {
        return res
          .status(res_user.status)
          .json(res_data.failed(res_user.reason));
      }

      const user = _.omit(res_user.data.dataValues, ['password'])
      const token = generateToken(user)
      res.json(
        res_data.success({ user, token })
      );
    } catch (e) {
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;
      let res_user = await req.authUC.login(username, password);
      if (res_user.is_success != true) {
      return  res.status(res_user.status).json(res_data.failed(res_user.reason));
      }
      const user = _.omit(res_user.data.dataValues, ['password'])
      const token = generateToken(user)
      res.json(
        res_data.success({ user, token })
      );
    } catch (e) {
      next(e);
    }
  },
  user: async (req, res, next) => {
    res.json(res_data.success(req.user));
  },
};

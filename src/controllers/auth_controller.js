const res_data = require("../helper/respons_data");
const url = require("../libs/handle_Upload");
const generateToken = require("../helper/jwt");

module.exports = {
  register: async (req, res, next) => {
    try {
      let user = {
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

      let res_user = await req.userUC.register(user);
      if (res_user.is_success != true) {
        return res.status(400).json(res_data.failed(res_user.message));
      }
      let avatar = null;
      if (req.file != undefined) {
        avatar = await url.uploadCloudinary(req.file.path);
      } else {
        avatar = process.env.PROFILE_URL;
      }
      user.avatar = avatar;

      res.json(
        res_data.success({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          token: generateToken(res_user.user.dataValues),
        })
      );
    } catch (e) {
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      let res_user = await req.userUC.login(username, password);
      if (res_user.is_success != true) {
        res.status(404).json(res_data.failed(res_user.message));
      }
      res.json({
        status: 'ok',
        message: 'success',
        token: generateToken(res_user.user)
      });
    } catch (e) {
      next(e);
    }
  },
  user: async (req, res, next) => {
    res.json(res_data.success(req.user));
  },
};

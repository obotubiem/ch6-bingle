const res_data = require("../helper/respons_data");

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      let res_category = await req.categoryUC.getCategory();
      if (res_category.is_success !== true) {
        return res
          .status(res_category.status)
          .json(res_data.failed(res_category.reason, null));
      }
      res.status(res_category.status).json(res_data.success(res_category.data));
    } catch (e) {
      next(e);
    }
  },
  getOneCategory: async (req, res, next) => {
    try {
      let id = req.params.id;
      let res_category = await req.categoryUC.getCategoryByID(id);
      if (res_category.is_success !== true) {
        return res
          .status(res_category.status)
          .json(res_data.failed(res_category.reason, null));
      }
      res.status(res_category.status).json(res_data.success(res_category.data));
    } catch (e) {
      next(e);
    }
  },
  getProductByCategory: async (req, res, next) => {
    try {
      let id = req.params.id;
      let res_category = await req.categoryUC.getProductByCategoryID(id);
      if (res_category.is_success !== true) {
        return res
          .status(res_category.status)
          .json(res_data.failed(res_category.reason, null));
      }
      res.status(res_category.status).json(res_data.success(res_category.data));
    } catch (e) {
      next(e);
    }
  },
  addCategory: async (req, res, next) => {
    try {
      let category = req.body;
      let create_res = await req.categoryUC.createCategory(category);
      if (create_res.is_success !== true) {
        return res
          .status(create_res.status)
          .json(res_data.failed(create_res.reason));
      }
      return res.status(create_res.status).json(res_data.success(create_res.data));
    } catch (e) {
      next(e);
    }
  },

  editCategory: async (req, res, next) => {
    try {
      let id = req.params.id;
      let category = req.body;

      let update_res = await req.categoryUC.updateCategory(category, id);
      if (update_res.is_success !== true) {
        return res
          .status(update_res.status)
          .json(res_data.failed(update_res.reason));
      }
      res.status(update_res.status).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      let id = req.params.id;
      let delete_res = await req.categoryUC.deleteCategory(id);
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

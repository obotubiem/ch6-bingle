const res_data = require("../helper/respons_data");

module.exports = {
  getAllCategory: async (req, res, next) => {
    try {
      let res_category = await req.categoryUC.getCategory();
      if (res_category.is_success !== true) {
        return res
          .status(404)
          .json(res_data.failed(res_category.message, null));
      }
      res.json(res_data.success(res_category.category));
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
          .status(404)
          .json(res_data.failed(res_category.message, null));
      }
      res.status(200).json(res_data.success(res_category.category));
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
          .status(404)
          .json(res_data.failed(res_category.message, null));
      }
      res.status(200).json(res_data.success(res_category.category));
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
          .status(404)
          .json(res_data.failed(create_res.message));
      }
      return res.status(200).json(res_data.success(category));
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
          .status(400)
          .json(res_data.failed(update_res.message));
      }
      res.json(res_data.success(category));
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

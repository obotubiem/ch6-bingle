const res_data = require("../helper/respons_data");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  getAllProduct: async (req, res, next) => {
    try {
      let res_product = await req.itemUC.getProducts();
      if (res_product.is_success !== true) {
        return res
          .status(404)
          .json(res_data.failed(res_product.message, null));
      }
      res.status(200).
        json(res_data.success(res_product.products));
    } catch (e) {
      next(e);
    }
  },
  getOneProduct: async (req, res, next) => {
    let id = req.params.id;
    try {
      let res_product = await req.itemUC.getProductByID(id);
      if (res_product.is_success != true) {
        return res
          .status(404)
          .json(res_data.failed(res_product.message, null));
      }
      res.status(200).
        json(res_data.success(res_product.product));
    } catch (e) {
      next(e);
    }
  },
  addProduct: async (req, res, next) => {
    try {
      let product = {
        id: uuidv4(),
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        sold: req.body.sold,
        description: req.body.description,
        category_id: req.body.category_id,
      };

      let res_product = await req.itemUC.addNewProduct(product);
      if (res_product.is_success != true) {
        res.status(400).json(res_data.failed(res_product.message));
      }

      res.json(res_data.success(product));
    } catch (e) {
      next(e);
    }
  },
  editProduct: async (req, res, next) => {
    try {
      let id = req.params.id;
      let product = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        sold: req.body.sold,
        description: req.body.description,
        category_id: req.body.category_id,
      };

      let update_res = await req.itemUC.updateProduct(product, id);
      if (update_res.is_success !== true) {
        return res.status(400).json(res_data.failed(update_res.message));
      }
      res.json(res_data.success(product));
    } catch (e) {
      next(e);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      let id = req.params.id;

      let delete_res = await req.itemUC.deleteProduct(id);
      if (delete_res.is_success !== true) {
        return res.status(400).json(res_data.failed(delete_res.message));
      }
      res.json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};

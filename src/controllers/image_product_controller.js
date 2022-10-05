const res_data = require("../helper/respons_data");
const url = require("../libs/handle_Upload");

module.exports = {
  getImageProductByProductID: async (req, res, next) => {
    product_id = req.params.product_id;
    try {
      let res_imageProduct =
        await req.productImageUC.getImageProductByProductID(product_id);
      if (res_imageProduct.is_success !== true) {
        return res.status(404).json(res_data.failed(res_imageProduct.message));
      }
      res.status(200).json(res_data.success(res_imageProduct.image));
    } catch (e) {
      next(e);
    }
  },
  getImageProductByID: async (req, res, next) => {
    id = req.params.id;
    try {
      let res_imageProduct = await req.productImageUC.getImageProductByID(id);
      if (res_imageProduct.is_success !== true) {
        return res.status(404).json(res_data.failed(res_imageProduct.message));
      }
      res.status(200).json(res_data.success(res_imageProduct.image));
    } catch (e) {
      next(e);
    }
  },
  createImageProduct: async (req, res, next) => {
    imageData = {
      url: null,
      product_id: req.body.product_id,
    };
    try {
      let imageProduct = null;
      imageProduct = await url.uploadCloudinaryProduct(req.file.path);
      imageData.url = imageProduct;
      let res_createImage = await req.productImageUC.createImageProduct(
        imageData
      );
      if (res_createImage.is_success !== true) {
        return res.status(400).json(res_data.failed(res_createImage.message));
      }
      res.status(200).json(res_data.success(res_createImage.image));
    } catch (e) {
      next(e);
    }
  },
  updateImageProduct: async (req, res, next) => {
    let id = req.params.id;
    imageData = {
      url: null,
      product_id: req.body.product_id,
    };
    try {
      let imageProduct = null;
      imageProduct = await url.uploadCloudinaryProduct(req.file.path);
      imageData.url = imageProduct;
      let res_updateImage = await req.productImageUC.updateImageProduct(
        imageData,
        id
      );
      if (res_updateImage.is_success !== true) {
        return res.status(404).json(res_data.failed(res_updateImage.message));
      }
      res.status(200).json(res_data.success(res_data.image));
    } catch (e) {
      next(e);
    }
  },
  deleteImageProduct: async (req, res, next) => {
    let id = req.params.id;
    try {
      let res_deteleImage = await req.productImageUC.deleteImageProduct(id);
      if (res_deteleImage.is_success !== true) {
        return res.status(404).json(res_data.failed(res_deteleImage.message));
      }
      res.status(200).json(res_data.success());
    } catch (e) {
      next(e);
    }
  },
};

const { Product, Category, ImageProduct, OrderDetail } = require("../database/models");

class ProductRepository {
  constructor() {
    this.productModel = Product;
    this.categoryModel = Category;
    this.imageProductModel = ImageProduct;
    this.orderDetailModel = OrderDetail;
  }

  async getProductByID(id) {
    let data = null;
    try {
      data = await this.productModel.findOne({
        where: { id: id },
        include: [
          {
            model: this.categoryModel,
            as: "category",
            attributes: ["name"],
          },
          {
            model: this.imageProductModel,
            as: 'image_products',
            attributes: ["url"],
          },
        ],
      })

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getProducts(product) {
    let data = null;
    try {
      data = await this.productModel.findAll(product);
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  }

  async createProduct(product) {
    return await this.productModel.create(product);
  }
  async updateProduct(product, id) {
    return await this.productModel.update(product, {
      where: { id: id },
    });
  }
  async deleteProduct(id) {
    return await this.productModel.destroy({
      where: { id: id },
    });
  }
}

module.exports = ProductRepository;

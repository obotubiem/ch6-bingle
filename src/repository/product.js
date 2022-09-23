const { Product, Category, Image_Product } = require("../database/models");

class ProductRepository {
  constructor() {
    this.ProductModel = Product;
    this.CategoryModel = Category;
    this.Image_ProductModel = Image_Product;
  }

  async getProductByID(id) {
    let data = null;
    try {
      data = await this.ProductModel.findOne({
        where: { id: id },
        include: [
          {
            model: this.CategoryModel,
            attributes: ["name"],
          },
          {
            model: this.Image_ProductModel,
            attributes: ["url"],
          },
        ],
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getProducts(product) {
    let data = null;
    try {
      data = await this.ProductModel.findAll(product);
    } catch (err) {
      console.log(err);
      return null;
    }
    return data;
  }

  async createProduct(product) {
    return await this.ProductModel.create(product);
  }
  async updateProduct(product, id) {
    return await this.ProductModel.update(product, {
      where: { id: id },
    });
  }
  async deleteProduct(id) {
    return await this.ProductModel.destroy({
      where: { id: id },
    });
  }
}

module.exports = ProductRepository;

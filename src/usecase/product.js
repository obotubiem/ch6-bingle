class Item {
  constructor(productRepository, categoryRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
  }

  async getProductByID(id) {
    let product = null;
    let is_success = false;
    product = await this.productRepository.getProductByID(id);
    if (product == null) {
      return { message: "product not found" };
    }
    is_success = true;
    return {
      is_success: is_success,
      product: product,
    };
  }

  async getProducts(filters) {
    let is_success = false;
    let products = await this.productRepository.getProducts(filters);
    if (products === null) {
      return { message: "product not found" };
    }
    is_success = true;
    return {
      is_success: is_success,
      products: products,
    };
  }

  async addNewProduct(data_product) {
    let is_success = false;
    let product = null;

    let checkExistCategory = await this.categoryRepository.getCategoryByID(
      data_product.category_id
    );
    if (checkExistCategory == null) {
      return {
        message: "failed add product, category not found",
      };
    }
    product = await this.productRepository.createProduct(data_product);
    if (product == null) {
      return {
        message: "something went wrong",
      };
    }
    is_success = true;
    return {
      is_success: is_success,
      product: product,
    };
  }

  async updateProduct(product_update, id) {
    let is_success = false;
    let product = null;

    let checkExistCategory = await this.categoryRepository.getCategoryByID(
      product_update.category_id
    );
    if (checkExistCategory == null) {
      return {
        message: "failed add product, category not found",
      };
    }
    product = await this.productRepository.updateProduct(product_update, id);
    if (product == null) {
      return {
        message: "something went wrong",
      };
    }
    is_success = true;
    return {
      is_success: is_success,
      product: product,
    };
  }
  async deleteProduct(id) {
    let is_success = false;

    let checkExistProduct = await this.productRepository.getProductByID(id);
    if (checkExistProduct == null) {
      return {
        message: "failed delete product, product not found",
      };
    }
    let product = await this.productRepository.deleteProduct(id);
    if (product == null) {
      return {
        message: "something went wrong",
      };
    }
    is_success = true;
    return {
      is_success: is_success,
      product: product,
    };
  }
}

module.exports = Item;

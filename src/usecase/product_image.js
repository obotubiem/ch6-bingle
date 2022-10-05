class ProductImageUC {
  constructor(productImageRepository, productRepository) {
    this.productImageRepository = productImageRepository;
    this.productRepository = productRepository;
  }
  async getImageProductByProductID(product_id) {
    let is_success = false;
    let product = await this.productRepository.getProductByID(product_id);
    if (product == null) {
      return { message: "product not found" };
    }
    let image = await this.productImageRepository.getAllImageByProductID(
      product_id
    );

    is_success = true;
    return {
      is_success,
      image,
    };
  }
  async getImageProductByID(image_id) {
    let is_success = false;
    let image = await this.productImageRepository.getImageProductByID(image_id);
    if (image == null) {
      return { message: "image not found" };
    }
    is_success = true;
    return {
      is_success,
      image,
    };
  }

  async createImageProduct(data) {
    let is_success = false;
    let image = null;
    let product = await this.productRepository.getProductByID(data.product_id);
    if (product == null) {
      return { message: "failed add image, Product not found" };
    }
    image = await this.productImageRepository.createImageProduct(data);
    if (image == null) {
      return { message: "something went wrong" };
    }
    is_success = true;
    return {
      is_success,
      image,
    };
  }
  async updateImageProduct(oldImage, id) {
    let is_success = false;
    let image = await this.getImageProductByID(id);
    if (image == null) {
      return { message: "product image not found" };
    }
    let newImage = await this.productImageRepository.updateImageProduct(
      oldImage,
      id
    );
    if (newImage == null) {
      return { message: "failed to update image" };
    }
    is_success = true;
    return {
      is_success,
      newImage,
    };
  }
  async deleteImageProduct(id) {
    let is_success = false;
   let image = null
    let imageExist = await this.productImageRepository.getImageProductByID(id);
    if (imageExist == null) {
      return { message: "product image not found" };
    }
    image = await this.productImageRepository.deleteImageProduct(id);
    let defaultImage = {
      url : process.env.ITEM_URL,
      product_id : imageExist.product_id
    }
    await this.createImageProduct(defaultImage)
    
    is_success = true;
    return { is_success: is_success };
  }
}

module.exports = ProductImageUC;

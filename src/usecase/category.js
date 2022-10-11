class Category {
   constructor(categoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async getCategoryByID(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
      }
      let category = await this.categoryRepository.getCategoryByID(id);
      if (category == null) {
<<<<<<< HEAD
         return {
            message: "category not found",
            category: category
         };
=======
         result.reason = "category not found"
         return result
>>>>>>> f4009be4b06901aae27efaa769efb253f24e6882
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async getCategory(filters) {
<<<<<<< HEAD
      let is_success = false
      let category = null

      category = await this.categoryRepository.getCategory(filters)
      if (category == null) {
         return { message: "category not found" };
      }
      is_success = true
      return { category, is_success }
   }
   async getProductByCategoryID(id) {
      let is_success = false
      let category = await this.categoryRepository.getProductByCategoryID(id)
      if (category == null) {
         return { message: "product not found" }
      }
      is_success = true
      return {
         is_success: is_success,
         category: category
=======
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
      }
     let category = await this.categoryRepository.getCategory(filters)
      if (category == null) {
         result.reason = "category not found"
         return result
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async getProductByCategoryID(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let category = await this.categoryRepository.getProductByCategoryID(id)
      if (category == null) {
         result.reason = "product not found"
         return result
>>>>>>> f4009be4b06901aae27efaa769efb253f24e6882
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async createCategory(data_category) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let category = await this.categoryRepository.createCategory(data_category);
      if (category == null) {
<<<<<<< HEAD
         return {
            message: "somethig went error",
            category: category
         };
      }
      is_success = true;
      return {
         is_success: is_success,
         category: category
=======
         result.reason = "somethig went error"
         result.status = 500
         return result
>>>>>>> f4009be4b06901aae27efaa769efb253f24e6882
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async updateCategory(category_data, id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let existCategory = await this.categoryRepository.getCategoryByID(id)
      if (existCategory == null) {
         result.reason = "category not found"
         return result
      }
      let category = await this.categoryRepository.updateCategory(category_data, id)
      if (category == null) {
         result.reason = "internal server error"
         result.status = 500
         return result 
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
   async deleteCategory(id) {
      let result = {
         is_success: false,
         reason: "failed",
         status: 404,
         data: null
       }
      let existCategory = await this.categoryRepository.getCategoryByID(id)
      if (existCategory == null) {
         result.reason = "category not found"
         return result
      }
      let category = await this.categoryRepository.deleteCategory(id)
      if (category == null) {
         result.reason = "internal server error"
         result.status = 500
         return result 
      }
      result.is_success = true;
      result.status = 200
      result.data = category
      return result
   }
}

module.exports = Category;
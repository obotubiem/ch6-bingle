class Category {
   constructor(categoryRepository) {
      this.categoryRepository = categoryRepository
   }
   async getCategoryByID(id) {
      let is_success = false;
      let category = await this.categoryRepository.getCategoryByID(id);
      if (category == null) {
         return { 
            message: "category not found",
            category: category
         };
      }
      is_success = true;
      return {
         is_success: is_success,
         category: category,
      };
   }
   async getCategory(filters) {
      let is_success = false
      let category = null
 
       category = await this.categoryRepository.getCategory(filters)
       if (category == null) {
         return { message: "category not found" };
       }
      is_success = true
      return {category , is_success}
   }
   async getProductByCategoryID(id) {
      let is_success = false   
     let category = await this.categoryRepository.getProductByCategoryID(id)
      if (category == null) {
         return {message : "product not found"}
      }
      is_success = true
      return {
         is_success: is_success,
         category: category
      }
   }
   async createCategory(data_category) {
      let is_success = false;
      let category = await this.categoryRepository.createCategory(data_category);
      if (category == null) {
         return { message: "somethig went error",
                  category: category                  
      };
      }
      is_success = true;
      return {
         is_success: is_success,
         category: category
      }
   }
   async updateCategory(category_data, id) {
      let is_success = false
      let category = null
      let categoryExist = await this.categoryRepository.getCategoryByID(id)
      if (categoryExist == null) {
         return { message: "category not found" };
      }
      category = await this.categoryRepository.updateCategory(category_data, id)
      if (category == null) {
         return { message: "somethig went error" };
      }
      is_success = true
      return {
         is_success: is_success,
         category: category
      }
   }
   async deleteCategory(id) {
      let is_success = false
      let category = null
      let categoryExist = await this.categoryRepository.getCategoryByID(id)
      if (categoryExist == null) {
         return { message: "category not found" };
      }
      category = await this.categoryRepository.deleteCategory(id)
      if (category == null) {
         return { message: "somethig went error" };
      }
      is_success = true
      return { is_success: is_success }
   }
}

module.exports = Category;
const res_data = require('../helper/respons_data')


module.exports = {
    addCategory: async (req, res, next) => {
        try {
            let category = req.body;
            let create_res = await req.categoryUC.createCategory(category);
            if (create_res.is_success !== true) {
                return res
                    .status(400)
                    .json(res_data.failed("add category failed"), null);
            }
            return res.status(200).json(res_data.success(category));
        } catch (error) {
            next(error);
        }
    },

    editCategory: async (req, res, next) => {
        try {
            let id = req.params.id;
            let category = req.body;

            let check_Data = await req.categoryUC.getCategoryByID(id);
            if (check_Data == null) {
                return res.status(404).json(res_data.failed("data not found", null));
            }
            let update_res = await req.categoryUC.updateCategory(category, id);
            if (update_res.is_success !== true) {
                return res.status(400).json(res_data.failed("update data failed"));
            }
            res.json(res_data.success(category));
        } catch (error) {
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            let id = req.params.id;

            let check_Data = await req.categoryUC.getCategoryByID(id);
            if (check_Data == null) {
                return res.status(404).json(res_data.failed("data not found", null));
            }
            let delete_res = await req.categoryUC.deleteCategory(id);
            if (delete_res.is_success !== true) {
                return res.status(400).json(res_data.failed("delete data failed"));
            }
            res.json(res_data.success("succes delete product"));
        } catch (error) {
            next(error);
        }
    },

    getAllCategory: async (req, res, next) => {
        try {
            let category = await req.categoryUC.getCategory()
            if (category.length === 0) {
                return res
                    .status(400)
                    .json(res_data.failed('Category not found', category))
            } else
                res.json(res_data.success(category))


        } catch (error) {
            next(error)
        }
    },

    getOneCategory: async (req, res, next) => {
        try {
            let id = req.params.id
            let category = await req.categoryUC.getCategoryByID(id)
            if (category == null) {
                return res
                    .status(400)
                    .json(res_data.failed('category not found', category))
            }

            res.status(200).json(res_data.success(category))
        } catch (error) {
            next(error)
        }
    },
    getProductByCategory: async (req, res, next) => {
        try {
            let id = req.params.id
            let category = await req.categoryUC.getProductByCategoryID(id)
            if (category == null) {
                return res
                    .status(400)
                    .json(res_data.failed('product not Found', category))
            }
            res.status(200).json(res_data.success(category))

        } catch (error) {
            next(error)
        }
    }
}
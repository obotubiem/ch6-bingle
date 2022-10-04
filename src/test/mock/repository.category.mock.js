const mockCategoryRepo = (
    {
        returnGetAllCategory,
        returnGetCategoryByID,
        returnGetProductByCategory,
        returnCreateCategory,
        returnUpdateCategory,
        returnDeleteCategory
    }
) => {

    const repo = {}

    repo.getCategoryByID = jest.fn().mockReturnValue(
        returnGetCategoryByID !== true ? returnGetCategoryByID : {

            id: "1",
            name: "celana",
        }
    )
    repo.getCategory = jest.fn().mockReturnValue(
        returnGetAllCategory !== true ? returnGetAllCategory : [
            {
                id: "1",
                name: "celana",
            }
        ]
    )
    repo.getProductByCategoryID = jest.fn().mockReturnValue(
        returnGetProductByCategory !== true ? returnGetProductByCategory : [
            {
                "id": "123e4567-e89b-12d3-a456-426614174123",
                "name": "Kaos Partai",
                "price": 45000,
                "stock": 100
            }

        ]
    )
    repo.createCategory = jest.fn().mockReturnValue(
        returnCreateCategory !== true ? returnCreateCategory : {

            id: "1",
            name: "celana",
        }
    )

    repo.updateCategory = jest.fn().mockReturnValue(
        returnUpdateCategory !== true ? returnUpdateCategory : true

    )
    repo.deleteCategory = jest.fn().mockReturnValue(
        returnDeleteCategory !== true ? returnDeleteCategory : true

    )
    return repo
}

module.exports = mockCategoryRepo
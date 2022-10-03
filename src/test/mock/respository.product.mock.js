const mockProductRepo = (
    {
        returnGetAllProduct,
        returnGetProductByID,
        returnCreateProduct,
        returnUpdateProduct,
        returnDeleteProduct
    }
) => {

    const repo = {}

    repo.getProductByID = jest.fn().mockReturnValue(
        returnGetProductByID !== true ? returnGetProductByID : {
            id: "123e4567-e89b-12d3-a456-111114174123",
            name: "Celaja Jeans",
            price: 145000,
            stock: 100,
            sold: 0,
            description: "Lorem ipsum dolor sit amet",
            category_id: 2
        }
    )
    repo.getProducts = jest.fn().mockReturnValue(
        returnGetAllProduct !== true ? returnGetAllProduct : [
            {
                id: "123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description: "Lorem ipsum dolor sit amet",
                category_id: 2
            }
        ]
    )
    repo.createProduct = jest.fn().mockReturnValue(
        returnCreateProduct !== true ? returnCreateProduct : {
             
                id: "123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description: "Lorem ipsum dolor sit amet",
                category_id: 1,
                image: null
        }
    )
    repo.updateProduct = jest.fn().mockReturnValue(
        returnUpdateProduct !== true ? returnUpdateProduct : true
    )
    repo.deleteProduct = jest.fn().mockReturnValue(
        returnDeleteProduct !== true ? returnDeleteProduct : true
    )
    return repo
}

module.exports = mockProductRepo
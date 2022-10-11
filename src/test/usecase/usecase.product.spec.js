const productUseCase = require('../../usecase/product')
const mockProductRepo = require('../mock/respository.product.mock')
const mockCategoryRepo = require('../mock/repository.category.mock')

let productValues, categoryValues = {}
let productUC = null

describe('product', () => {
    beforeEach(() => {
        productValues = {
            returnGetProductByID: true,
            returnGetAllProduct: true,
            returnCreateProduct: true,
            returnUpdateProduct: true,
            returnDeleteProduct: true
        }
        categoryValues = {
            returnGetCategoryByID: true
        }
        productUC = new productUseCase(
            mockProductRepo(productValues),
            mockCategoryRepo(categoryValues)
        )
    })

    describe('get Product By ID', () => {
        test("is_success = true", async () => {
            let res = await productUC.getProductByID()
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
    })

    test("is_success = false", async () => {
        productValues.returnGetProductByID = null
        productUC = new productUseCase(mockProductRepo(productValues))
        let res = await productUC.getProductByID()
        expect(res.is_success).toBeFalsy()
        expect(res.reason).toEqual('product not found')
    })

    describe('get all Product', () => {
        test('is_success = true', async () => {
            let res = await productUC.getProducts()
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
    })
    test('is_success = false', async () => {
        productValues.returnGetAllProduct = null
        productUC = new productUseCase(mockProductRepo(productValues))
        let res = await productUC.getProducts()
        expect(res.is_success).toBeFalsy()
        expect(res.reason).toEqual('product not found')
    })

    describe('create Product', () => {
        test('is_success = true', async () => {
            let res = await productUC.addNewProduct({
                id: "123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description: "Lorem ipsum dolor sit amet",
                category_id: 1,
                image: null
            })
            expect(res.is_success).toBeTruthy()

        })
        test('is_success = false', async () => {
            productValues.returnCreateProduct = null
            productUC = new productUseCase(mockProductRepo(productValues), mockCategoryRepo(categoryValues))
            let res = await productUC.addNewProduct({
                id: "123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description: "Lorem ipsum dolor sit amet",
                category_id: 3,
                image: null
            })
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("something went wrong")
        })
        test('is_success = false', async () => {
            categoryValues.returnGetCategoryByID = null
            productUC = new productUseCase(
                mockProductRepo(productValues),
                mockCategoryRepo(categoryValues))
            let res = await productUC.addNewProduct({
                id: "123e4567-e89b-12d3-a456-111114174123",
                name: "Celaja Jeans",
                price: 145000,
                stock: 100,
                sold: 0,
                description: "Lorem ipsum dolor sit amet",
                category_id: 3,
                image: null
            })
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("failed add product, category not found")
        })
    })

    describe('deleteProduct', () => {
        test('is_success = true', async () => {
            let res = await productUC.deleteProduct("123e4567-e89b-12d3-a456-111114174123")
            expect(res.is_success).toBeTruthy()
        })
        test('is_success = false server error', async () => {
            productValues.returnDeleteProduct = null
            productUC = new productUseCase(
                mockProductRepo(productValues),
                mockCategoryRepo(categoryValues))
            let res = await productUC.deleteProduct("123e4567-e89b-12d3-a456-111114174123")
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("failed add product, category not found")
        })
        test('is_success = false product not found', async () => {
            productValues.returnGetProductByID = null
            productUC = new productUseCase(
                mockProductRepo(productValues),
                mockCategoryRepo(categoryValues))
            let res = await productUC.deleteProduct("123e4567-e89b-12d3-a456-111114174123")
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("failed delete product, category not found")
        })
    })

    describe('Update Product', () => {
        test('is_success = true', async () => {
            let res = await productUC.updateProduct("123e4567-e89b-12d3-a456-111114174123", {
                name: "Celaja Jeans",
                category_id: 1,
            })
            expect(res.is_success).toBeTruthy()

        })
        test('is_success = false ', async () => {
            productValues.returnUpdateProduct = null
            productUC = new productUseCase(mockProductRepo(productValues), mockCategoryRepo(categoryValues))
            let res = await productUC.updateProduct("123e4567-e89b-12d3-a456-111114174123", {
                name: "Celaja Jeans",
                category_id: 1,
            })
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("failed add product, category not found")
        })
        test('is_success = false', async () => {
            categoryValues.returnGetCategoryByID = null
            productUC = new productUseCase(
                mockProductRepo(productValues),
                mockCategoryRepo(categoryValues))
            let res = await productUC.updateProduct("123e4567-e89b-12d3-a456-111114174123", {
                name: "Celaja Jeans",
                category_id: 1,
            })
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("failed add product, category not found")
        })
    })
})
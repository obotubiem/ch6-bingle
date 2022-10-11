const categoryUseCase = require('../../usecase/category')
const mockCategoryRepo = require('../mock/repository.category.mock')

let categoryValues = {}
let categoryUC = null

describe('category', () => {
    beforeEach(() => {
        categoryValues = {
            returnGetAllCategory: true,
            returnGetCategoryByID: true,
            returnGetProductByCategory: true,
            returnCreateCategory: true,
            returnUpdateCategory: true,
            returnDeleteCategory: true

        }
        categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
    })
    describe('get category BY ID', () => {
        test("is_success = true", async () => {
            let res = await categoryUC.getCategoryByID(1)
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test("is_success = false", async () => {
            categoryValues.returnGetCategoryByID = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.getCategoryByID(1)
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual('category not found')
        })
    })
    describe('get all category', () => {
        test("is_success = true", async () => {
            let res = await categoryUC.getCategory()
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test("is_success = false", async () => {
            categoryValues.returnGetAllCategory = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.getCategory()
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual('category not found')
        })
    })
    describe('get product BY category', () => {
        test("is_success = true", async () => {
            let res = await categoryUC.getProductByCategoryID(1)
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test("is_success = false", async () => {
            categoryValues.returnGetProductByCategory = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.getProductByCategoryID(1)
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("product not found")
        })
    })


    describe('create category', () => {
        test('is_success = true', async () => {
            let res = await categoryUC.createCategory({
                id: 1,
                name: "Topi"
            })
            expect(res.is_success).toBeTruthy()
        })
        test('is_success = false', async () => {
            categoryValues.returnCreateCategory = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.createCategory({
                id: 1,
                name: "Topi"
            })
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("somethig went error")
        })
    })
    describe('update category', () => {
        test('is_success = true', async () => {
            let res = await categoryUC.updateCategory(1, { name: "kemeja" })
            expect(res.is_success).toBeTruthy()
        })
        test('is_success = false error category not found', async () => {
            categoryValues.returnGetCategoryByID = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.updateCategory(1, { name: "kemeja" })

            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("category not found")
        })
        test('is_success == fales server error', async () => {
            categoryValues.returnUpdateCategory = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.updateCategory(1, { name: "kemeja" })

            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("internal server error")
        })
    })
    describe('delete category', () => {
        test('is_success = true', async () => {
            let res = await categoryUC.deleteCategory(1)
            expect(res.is_success).toBeTruthy()
        })
        test('is_success = false', async () => {
            categoryValues.returnDeleteCategory = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.deleteCategory(1)
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("internal server error")
        })
        test('is_success = false category not found', async () => {
            categoryValues.returnGetCategoryByID = null
            categoryUC = new categoryUseCase(mockCategoryRepo(categoryValues))
            let res = await categoryUC.deleteCategory(1)
            expect(res.is_success).toBeFalsy()
            expect(res.reason).toEqual("category not found")
        })
    })

})

const addressUseCase = require('../../usecase/address')
const mockAddressRepo = require('../mock/repository.address')
const mockUserRepo = require('../mock/repository.user.mock')

let addressValues, userValues = {}
let addressUC = null

describe('address', () => {
    beforeEach(() => {
        addressValues = {
            returnGetAddressByUserID: true,
            returnCreateAddress: true,
            returnUpdateAddress: true,
            returnGetAddressByID: true,
            returnDeleteAddress: true
        }
        userValues = {
            returnGetUserByID: true,
        }
        addressUC = new addressUseCase(
            mockAddressRepo(addressValues),
            mockUserRepo(userValues)
        )
    })
    describe('get address by user ID', () => {
        test('is_success = true', async () => {
            let res = await addressUC.getAddressByUserID(2)
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test('is_succes = false', async () => {
            addressValues.returnGetAddressByUserID = null
            addressUC = new addressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            )
            let res = await addressUC.getAddressByUserID(2)
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("address not found")
        })
    })
    describe('create address', () => {
        test('is_success = true', async () => {
            let res = await addressUC.addNewAddress(
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test('is_success = false User ID not found', async () => {
            userValues.returnGetUserByID = null
            addressUC = new addressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            )
            let res = await addressUC.addNewAddress(
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("failed add address, address not found")
        })
        test('is_success = false server error', async () => {
            addressValues.returnCreateAddress = null
            addressUC = new addressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            )
            let res = await addressUC.addNewAddress(
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("something went wrong")
        })
    })
    describe('Update address', () => {
        test('is_success = true', async () => {
            let res = await addressUC.updateAddress(2,
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeTruthy()
            expect(res.data === null).toEqual(false)
        })
        test('is_success = false User ID not found', async () => {
            userValues.returnGetUserByID = null
            addressUC = new addressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            )
            let res = await addressUC.updateAddress(
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("failed add address, user not found")
        })
        test('is_success = false Address Not found', async () => {
            addressValues.returnGetAddressByID = null
            addressUC = new addressUseCase(
                mockAddressRepo(addressValues),
                mockUserRepo(userValues)
            )
            let res = await addressUC.updateAddress(
                {
                    province: "Jawa Barat",
                    city: "Garut",
                    postal_code: "jl.abc",
                    detail_address: "jawaras",
                    user_id: 2
                }
            )
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("failed add address, address not found")
        })
    })
    describe('delete address', () => {
        test('is_success = true', async () => {
            let res = await addressUC.deleteAddress(1)
            expect(res.is_success).toBeTruthy()
        })
        test('is_success = false address not found', async () => {
            addressValues.returnGetAddressByID = null
            addressUC = new addressUseCase(mockAddressRepo(addressValues))
            let res = await addressUC.deleteAddress()
            expect(res.is_success).toBeFalsy()
            expect(res.message).toEqual("failed add address, address not found")
        })
    })
})
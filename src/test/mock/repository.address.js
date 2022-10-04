const mockAddressRepo = (
    {
        returnGetAddressByUserID,
        returnCreateAddress,
        returnGetAddressByID,
        returnUpdateAddress,
        returnDeleteAddress
    }
) => {
    const repo = {}
    repo.getAddressByUserID = jest.fn().mockReturnValue(
        returnGetAddressByUserID !== true ? returnGetAddressByUserID : [
            {
                "province": "jawa barat",
                "city": "Garut",
                "postal_code": "jl.abc",
                "detail_address": "jawaras",
                "user_id": 2
            }
        ]
    )
    repo.getAddressByID = jest.fn().mockReturnValue(
        returnGetAddressByID !== true ? returnGetAddressByID : {
            "province": "Jawa Barat",
            "city": "Garut",
            "postal_code": "jl.abc",
            "detail_address": "jawaras",
            "user_id": 2
        }
    )
    repo.createAddress = jest.fn().mockReturnValue(
        returnCreateAddress !== true ? returnCreateAddress : {

            "province": "Jawa Barat",
            "city": "Garut",
            "postal_code": "jl.abc",
            "detail_address": "jawaras",
            "user_id": 2

        }
    )
    
    repo.updateAddress = jest.fn().mockReturnValue(
        returnUpdateAddress !== true ? returnUpdateAddress : true 
    )
    
    repo.deleteAddress = jest.fn().mockReturnValue(
        returnDeleteAddress !== true ? returnDeleteAddress : true
    )
    
    return repo
}

module.exports = mockAddressRepo
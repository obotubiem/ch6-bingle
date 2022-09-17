const res_data = require('../helper/respons_data')

module.exports = {
    addAddress: async (req, res, next) => {
        try {
            let address = {
                province,
                city,
                postal_code,
                detail_address,
                user_id
            } = req.body

            let checkUserExist = await req.userUC.getUserByID(address.user_id)
            if(checkUserExist == null){
                return res.status(404).json(res_data.failed('user not found', null))
            }
            let create_res = await req.addressUC.createAddress(address)
            if(create_res.is_succsess != true){
                return res.status(500).json(res_data.failed('internal server error', null))
            }
            res.status(200).json(res_data.success(address))
        } catch (error) {
            next(error)
        }
    },


    getAddress: async (req, res, next) => {
        try {
            let address = await req.addressUC.getAllAddress()
            if (address.length === 0) {
                return res
                    .status(404)
                    .json(res_data.failed('address not foubd', null))
            } else
                res.json(res_data.success(address))
        } catch (error) {
            next(error)
        }
    },
    getOneAddress: async (req, res, next) => {
        try {
            let id = req.params.id
            let address = await req.addressUC.getAddressByID(id)
            if (address == null) {
                return res
                    .status(400)
                    .json(res_data.failed('Address not found', address))
            }

            res.status(200).json(res_data.success(address))
        } catch (error) {
            next(error)
        }
    },

    editAddres : async (req, res, next)=>{
        let id = req.params.id
        try {
            let address = {
                province,
                city,
                postal_code,
                detail_address,
                user_id
            } = req.body

            let checkUserExist = await req.userUC.getUserByID(address.user_id)
            if(checkUserExist == null){
                return res.status(404).json(res_data.failed('user not found', null))
            }
            let create_res = await req.addressUC.updateAddress(address , id)
            if(create_res.is_succsess != true){
                return res.status(500).json(res_data.failed('internal server error', null))
            }
            res.status(200).json(res_data.success(address))
        } catch (error) {
            next(error)
        }
    },
    deleteAddress : async (req, res, next)=>{
        try {
            let id = req.params.id
            let check_Data = await req.addressUC.getAddressByID(id)
            if(!check_Data) {
                return  res.status(404).json(res_data.failed('data not found', null))
            }
            let delete_res = await req.addressUC.deleteAddress(id)
            if(delete_res.is_success !== true){
                return res
                .status(400)
                .json(res_data.failed ('delete data failed'))
            }
            res.json(res_data.success('success delete address'))
        } catch (error) {
            next(error)
        }
    },

}
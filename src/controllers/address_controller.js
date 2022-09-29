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

            let create_res = await req.addressUC.addNewAddress(address)
            if (create_res.is_success != true) {
                return res.status(404).json(res_data.failed(create_res.message))
            }
            res.json(res_data.success(address));
        } catch (e) {
            next(e)
        }
    },


    getAddress: async (req, res, next) => {
        try {
            let address = await req.addressUC.getAllAddress()
            if(address.is_success !== true){
                return res
                .status(200)
                .json(address.message)
            }
             res.json(res_data.success(address))
        } catch (e) {
            next(e)
        }
    },
    getAddressByUserID: async (req, res, next) => {
        try {
            let user_id = req.params.id
            let address = await req.addressUC.getAddressByUserID(user_id)
            if (address.is_success !== true) {
                return res
                    .status(200)
                    .json(res_data.failed(address.message))
            }
            res.status(200).json(res_data.success(address))
        } catch (e) {
            next(e)
        }
    },

    editAddres: async (req, res, next) => {
        let id = req.params.id
        try {
            let address = {
                province,
                city,
                postal_code,
                detail_address,
                user_id
            } = req.body

            let create_res = await req.addressUC.updateAddress(address, id)
            if (create_res.is_success != true) {
                return res.status(500).json(res_data.failed(create_res.message))
            }
            res.status(200).json(res_data.success(address))
        } catch (e) {
            next(e)
        }
    },
    deleteAddress: async (req, res, next) => {
        try {
            let id = req.params.id
            let delete_res = await req.addressUC.deleteAddress(id)
            if (delete_res.is_success !== true) {
                return res
                    .status(400)
                    .json(res_data.failed(delete_res.message))
            }
            res.json(res_data.success())
        } catch (e) {
            next(e)
        }
    },

}
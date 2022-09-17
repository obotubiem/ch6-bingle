const res_data = require('../helper/respons_data')

module.exports = {
    getAddress : async (req, res, next)=>{
        try {
            let address = await req.addressUC.getAllAddress()
            if(address.length === 0){
                return res
                .status(404)
                .json(res_data.failed('address not foubd', null))
            } else
            res.json(res_data.success(address))
        } catch (error) {
            next(error)
        }
    }
}
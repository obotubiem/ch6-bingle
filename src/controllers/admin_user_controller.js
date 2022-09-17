const res_data = require('../helper/respons_data')

module.exports = {
    getAllUser : async (req, res, next)=>{
        try {
            let user = await req.userUC.getAllUser()
            if(user.length === 0){
                return res
                .status(404)
                .json(res_data.failed('user not found', null))
            } else
            res.json(res_data.success(user))
        } catch (error) {
            next(error)
        }
    }
}
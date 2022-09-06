const bcrypt = require("bcrypt")
const res_data = require('../utils/respons_data')


module.exports = {
    login : async (req, res, next)=>{
        try {
            let username = req.body.username
            let password = req.body.password

            let user = await req.userUC.getUserByUsername(username)
            if(!user){
                return res
                .status(400)
                .json(res_data.failed, 'username or password incorrect', user)
            }
            if(bcrypt.compareSync(password, user.password)!==true){
                return res
                .json(res_data.failed, 'username or password incorrect', user)
            }
                res.json(res_data.success(user))
        } catch (error) {
            next(error)
        }
    }
}
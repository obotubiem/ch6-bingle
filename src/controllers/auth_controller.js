const bcrypt = require("bcrypt")
const res_data = require('../helper/respons_data')
const generateToken = require('../helper/jwt')
module.exports = {
    register: async (req, res, next) => {

        try {
            let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
                avatar: req.file.name,
                role_id: 2
            }
            if (req.body.password !== req.body.confrimPassword) {
                return res
                    .status(400)
                    .json(res_data.failed("password and confrimPassword not", null))
            }
            let password = bcrypt.hashSync(req.body.password, 10)
            let confrimPassword = bcrypt.hashSync(req.body.confrimPassword, 10)

            user.password = password
            user.confrimPassword = confrimPassword

            let checkUsernameExits = await req.userUC.getUserByUsername(req.body.username)
            let checkEmailExits = await req.userUC.getUserByEmail(user.email)
            let checkPhoneExits = await req.userUC.getUserByPhone(user.phone)
       
            if (checkUsernameExits != null) {
                return res
                    .status(400)
                    .json(res_data.failed("username not aviabel", null))
            }
            if (checkEmailExits != null) {
                return res
                    .status(400)
                    .json(res_data.failed("Email not aviabel", null))
            }
            if (checkPhoneExits != null) {
                return res
                    .status(400)
                    .json(res_data.failed("Phone not aviabel", null))
            }
            let addUser = await req.userUC.createUser(user)
                if (addUser.is_success != true){
                    return res
                    .status(400)
                    .json(res_data.failed("internal server error", null))
                }
            res.json(
                res_data.success({
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar,
                    token: generateToken(user)
                })
            )
        } catch (error) {
            next(error)
        }
    }
}
